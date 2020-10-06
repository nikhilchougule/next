import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, Injectable, Optional, Inject, ViewChild } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject} from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICriticalSystem } from '../_models/criticalSyst.interface'
import { CriticalSystemService } from '../_services/critical-system.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

interface CsNode {
  ActiveFlag: Boolean
  Description: string
  DisplayOrderId: number
  EntityId: number
  EntityTypeId: number
  Id: number
  Name: string
  ParentId: number
  RecognitionId: number
  ReportColumnHeader: string
  ReportTableControlColumnName: string
  ReportTableName: string
  children:CsNode[]
}
export class TreeItemFlatNode {
  id: string;
  level: number;
  expandable: boolean;
  ParentId: string;
}
@Injectable()
export class ChecklistDatabase {
  
  dataChange = new BehaviorSubject<CsNode[]>([]);

  treeData:any;
  get data(): CsNode[] { return this.dataChange.value; }

  constructor(private csData:CriticalSystemService) {
    this.initialize();
  }
  initialize() {
    this.csData.getGenerateTree().subscribe(async(res)=>{
    this.treeData = await res;
    const nextData = await this.getNestedChildren(this.treeData,null);
    await this.dataChange.next(nextData);

    // Notify the change.
    })
 
   
  }
  
   getNestedChildren(models, parentId) {
    const nestedTreeStructure = [];
    const length = models.length;

    for (let i = 0; i < length; i++) { // for-loop for perf reasons, huge difference in ie11
        const model = models[i];

        if (model.ParentId == parentId) {
            const children = this.getNestedChildren(models, model.Id);

            if (children.length > 0) {
                model.children = children;
            }

            nestedTreeStructure.push(model);
        }
    }
    return nestedTreeStructure;
}
  
  public filter(filterText: string) {
    let filteredTreeData;
    let datafilter;
    if (filterText) {
      filteredTreeData = this.treeData.filter(d => d.Name.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) > -1);
      Object.assign([], filteredTreeData).forEach(ftd => {
        let str = (<number>ftd.ParentId);
        datafilter = this.getNestedChildren(this.treeData,ftd.Id);

      });
    } else {
      filteredTreeData = this.treeData;
       datafilter = this.getNestedChildren(filteredTreeData,null);

    }

    this.dataChange.next(datafilter);
}
}
@Component({
  selector: 'app-control-cda-list',
  templateUrl: './control-cda-list.component.html',
  styleUrls: ['./control-cda-list.component.scss'],
    providers: [ChecklistDatabase]

})
export class ControlCdaListComponent implements OnInit {
  selectedNodeData: any[];
  allnode = [];
  source: CsNode[];
  dataSourceTable: MatTableDataSource<CsNode>;
    isLoadingResults = true;
    update: boolean = false;
    dataLength: number = 0;
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  // displayedColumns: string[] = ['Locations','System','Assets'];
  displayedColumns: string[] = ['Id','Name','ParentId'];
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);


 /** The selection for checklist */
  checklistSelection = new SelectionModel<CsNode>(true /* multiple */);
  treeControl = new NestedTreeControl<CsNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<CsNode>();

  constructor(public dialog: MatDialog,private database: ChecklistDatabase,private csData:CriticalSystemService) {
    database.dataChange.subscribe(data => {
      console.log(data)
      this.dataSource.data = data;
      console.log(this.dataSource.data)
    });
  }

  hasChild = (_: number, node: CsNode) => !!node.children && node.children.length > 0;

/**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */

  
  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: CsNode): boolean {
    // console.log(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: CsNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do id selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: CsNode): void {

   this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
     this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child));
   this.selectedNodeData = this.checkAllParentsSelection(node,this.checklistSelection.isSelected(node));
   console.log(this.checklistSelection.isSelected(node));
 
   let dialogRef 
   if(this.checklistSelection.isSelected(node)){
       console.log(this.selectedNodeData);
       this.dataSourceTable = new MatTableDataSource(this.selectedNodeData);
       this.dataSourceTable.paginator = this.paginator;
       this.dataLength = this.selectedNodeData.length
       this.isLoadingResults = false;
     }else{
      this.dataSourceTable = new MatTableDataSource(this.selectedNodeData);
      this.dataSourceTable.paginator = this.paginator;
      this.dataLength = this.selectedNodeData.length
      this.isLoadingResults = false;
     }
 


  }

  /** Toggle a leaf to-do id selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: CsNode): void {
    this.checklistSelection.toggle(node);
    // this.allnode = [];
    
    this.checklistSelection.isSelected(node) 
    ? this.checklistSelection.select(node)
    : this.checklistSelection.deselect(node);
    this.selectedNodeData = this.checkAllParentsSelection(node,this.checklistSelection.isSelected(node));
    console.log(this.checklistSelection.isSelected(node));
    if(this.checklistSelection.isSelected(node)){
      this.dataSourceTable = new MatTableDataSource(this.selectedNodeData);
      this.dataSourceTable.paginator = this.paginator;
      this.dataLength = this.selectedNodeData.length
      this.isLoadingResults = false;
    }else{
      this.dataSourceTable = new MatTableDataSource(this.selectedNodeData);
      this.dataSourceTable.paginator = this.paginator;
      this.dataLength = this.selectedNodeData.length
      this.isLoadingResults = false;
    }
   


  }
getChild(node: CsNode,selected:boolean){
  node.children.forEach(element => {
    if(element.children){
      this.checkAllParentsSelection(element,selected);
    }else{
      if(selected){
        this.allnode.push(element);
      }else{
        this.allnode = this.allnode.filter(function( obj ) {
          return obj.Id !== element.Id;
      });        
      }
      
    }
  });
}
  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: CsNode,selected:boolean) {
    console.log(node)
    console.log(selected)
    if(node.children){
      if(selected){
        this.allnode.push(node);
        this.getChild(node,selected)
      }else{
       this.allnode = this.allnode.filter(function( obj ) {
          return obj.Id !== node.Id;
      }); 
      this.getChild(node,selected)       
      }
   
    }else{
      if(selected){
        this.allnode.push(node);
      }else{
        this.allnode = this.allnode.filter(function( obj ) {
          return obj.Id !== node.Id
        });      
      }
    }
    console.log(this.allnode)
    return this.allnode;
  }

  
  
  ngOnInit(): void {

 
  }
  filterChanged(filterText: string,) {
    console.log(filterText)
    this.database.filter(filterText);
    // if(filterText)
    // {
    //   this.treeControl.expandAll();
    // } else {
    //   this.treeControl.collapseAll();
    // }
  }
  applyFilter(event){

  }
  save(){

  }

}

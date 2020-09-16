import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, Injectable, Optional, Inject } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject} from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICriticalSystem } from '../_models/criticalSyst.interface'
import { CriticalSystemService } from '../_services/critical-system.service';

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

// const datas = [
//   { id: '56', parentId: '62' },
//   { id: '81', parentId: '80' },
//   { id: '74', parentId: null },
//   { id: '76', parentId: '80' },
//   { id: '63', parentId: '62' },
//   { id: '80', parentId: '86' },
//   { id: '87', parentId: '86' },
//   { id: '62', parentId: '74' },
//   { id: '86', parentId: '74' },
// ];
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
/**
 * @title Tree with checkboxes
 */
@Component({
  selector: 'app-security-control-tree',
  templateUrl: './security-control-tree.component.html',
  styleUrls: ['./security-control-tree.component.scss'],
  providers: [ChecklistDatabase]

})
export class SecurityControlTreeComponent implements OnInit {
  selectedNodeData: any[];
  allnode = [];
  source: CsNode[];

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
   this.selectedNodeData = this.checkAllParentsSelection(node);
   console.log(this.checklistSelection.isSelected(node));
 
   let dialogRef 
   if(this.checklistSelection.isSelected(node)){
       this.dialog.open(DialogSelectedElement, {
      data:{
        value:node,
        selected:this.checklistSelection.isSelected(node)
      } 
      });
   }
 


  }

  /** Toggle a leaf to-do id selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: CsNode): void {
    this.checklistSelection.toggle(node);
    this.allnode = [];
    this.selectedNodeData = this.checkAllParentsSelection(node);
    this.dialog.open(DialogSelectedElement, {
     data:{
       value:this.selectedNodeData,
       selected:this.checklistSelection.isSelected(node)
     } 
     });
  }
getChild(node: CsNode){
  node.children.forEach(element => {
    if(element.children){
      this.checkAllParentsSelection(element);
    }else{
      this.allnode.push(element.Id);
    }
  });
}
  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: CsNode) {
    if(node.children){
       this.allnode.push(node.Id);
       this.getChild(node)
    }else{
      this.allnode.push(node.Id);
    }
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

}

@Component({
  selector: 'dialog-elements-example-dialog',
  template:  `
  <h1 mat-dialog-title></h1>
  
  <div mat-dialog-content class="displayPopUpMain" >
   <div class="displayPopUp">
         <h3 mat-dialog-title>ParentId:</h3>
         <span mat-dialog-content>{{local_data.ParentId}}</span>

    </div>
    <div class="displayPopUp">
         <h3 mat-dialog-title>Name:</h3>
         <span mat-dialog-content>{{local_data.Name}}</span>

    </div>
    <div class="displayPopUp">
         <h3 mat-dialog-title>Description:</h3>
         <span mat-dialog-content>{{local_data.Description}}</span>

    </div>
     <div class="displayPopUp">
         <h3 mat-dialog-title>DisplayOrderId:</h3>
         <span mat-dialog-content>{{local_data.DisplayOrderId}}</span>
         </div>
     <div class="displayPopUp">
         <h3 mat-dialog-title>EntityTypeId:</h3>
         <span mat-dialog-content>{{local_data.EntityTypeId}}</span>

    </div> 
    <div class="displayPopUp">
         <h3 mat-dialog-title>ReportColumnHeader:</h3>
         <span mat-dialog-content>{{local_data.ReportColumnHeader}}</span>

    </div> 
     <div class="displayPopUp">
         <h3 mat-dialog-title>ReportTableControlColumnName:</h3>
         <span mat-dialog-content>{{local_data.ReportTableControlColumnName}}</span>

    </div> 
      <div class="displayPopUp">
         <h3 mat-dialog-title>ReportTableName:</h3>
         <span mat-dialog-content>{{local_data.ReportTableName}}</span>
    </div> 
    
    
  <div>

  
<div mat-dialog-actions>
  <button mat-button mat-dialog-close>Close</button>
</div>
  `,
})
export class DialogSelectedElement {
  title: string;
  local_data : CsNode ;

  constructor(
    public dialogRef: MatDialogRef<DialogSelectedElement>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data:any,) {
      this.local_data = data.value;
      console.log(this.local_data)
      if(data.selected){
        this.title = 'Selected';
      }else{
        this.title = 'Deselected';
        this.closeDialog();
      }

    }
    closeDialog() {
      this.dialogRef.close({ event: 'Cancel' });
  }
  
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Groups } from '../assessments.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatStepper } from '@angular/material/stepper';
const ELEMENT_DATA: Groups[] = [
  {position: 1, name: 'Common Controls NEI-08-09 Rev.6 Appendix-D', Purpose:'n/a', Description: 'n/a'},
  {position: 2, name: 'Common Controls NEI-08-09 Rev.6 Appendix-E', Purpose: 'n/a', Description: 'n/a'},
  
];
export interface assessmentRevision {
  Revision:number
  SCIP_Applied:string
  Assignment_Status:string
  Owner:string
  Activity:string
  Date:string
}
const assessmentRevision:assessmentRevision[] = [
  {Revision:1,SCIP_Applied:'None',Assignment_Status:'Assigned TO',Owner:'admin',Activity:'WalkDown',Date:'08/24/2020 14:59:16'},
  {Revision:2,SCIP_Applied:'None',Assignment_Status:'Assigned TO',Owner:'admin',Activity:'WalkDown',Date:'08/24/2020 14:59:16'},
  {Revision:3,SCIP_Applied:'None',Assignment_Status:'Assigned TO',Owner:'admin',Activity:'WalkDown',Date:'08/24/2020 14:59:16'},
  {Revision:4,SCIP_Applied:'None',Assignment_Status:'Assigned TO',Owner:'admin',Activity:'WalkDown',Date:'08/24/2020 14:59:16'},

]
export interface assessmentRevisionControl{
  position:number
  Control:string
  Status:string
  Assessment_Guidance:string
  Assessment_Decisions:string
  Corrective_Action:string
}
const assessmentRevisionControl:assessmentRevisionControl[]  = [
  {position:1,Control:'None',Status:'Assigned TO',Assessment_Guidance:'admin',Assessment_Decisions:'WalkDown',Corrective_Action:'n/a'},
  {position:2,Control:'None',Status:'Assigned TO',Assessment_Guidance:'admin',Assessment_Decisions:'WalkDown',Corrective_Action:'n/a'},
  {position:3,Control:'None',Status:'Assigned TO',Assessment_Guidance:'admin',Assessment_Decisions:'WalkDown',Corrective_Action:'n/a'},
  {position:4,Control:'None',Status:'Assigned TO',Assessment_Guidance:'admin',Assessment_Decisions:'WalkDown',Corrective_Action:'n/a'},

]
const assessmentRevisionDA:assessmentRevisionDA[] =[
{position:1, Digital_Asset:'DA-1',Control_Result_Status:'Batch',Inherit_Batch_Status:'Yes',Assessment_Observation:'n/a',Assessment_Decisions:'n/a', Corrective_Action:'n/a'},
{position:2,Digital_Asset:'DA-1',Control_Result_Status:'Batch',Inherit_Batch_Status:'Yes',Assessment_Observation:'n/a',Assessment_Decisions:'n/a', Corrective_Action:'n/a'},
{position:3,Digital_Asset:'DA-1',Control_Result_Status:'Batch',Inherit_Batch_Status:'Yes',Assessment_Observation:'n/a',Assessment_Decisions:'n/a', Corrective_Action:'n/a'},
{position:4,Digital_Asset:'DA-1',Control_Result_Status:'Batch',Inherit_Batch_Status:'Yes',Assessment_Observation:'n/a',Assessment_Decisions:'n/a', Corrective_Action:'n/a'}

]
const assessmentArtifacts:assessmentArtifacts[] = [
]
const revisionArtifacts:revisionArtifacts[] = [

]
export interface assessmentRevisionDA{
  position:number
  Digital_Asset:string
  Control_Result_Status:string
  Inherit_Batch_Status:string
  Assessment_Observation:string
  Assessment_Decisions:string
  Corrective_Action:string
}
export interface assessmentArtifacts{
  position:number
  Document_File_Name:string
  Entity:string
  External_Doc_File_Name:string
  External_Doc_Length_External_Doc_Content_Type:string
  Document:string
  
}
export interface revisionArtifacts{
  position:number
  Document_File_Name:string
  Entity:string
  External_Doc_File_Name:string
  External_Doc_Length_External_Doc_Content_Type:string
  Document:string
  
}

@Component({
  selector: 'app-assessment-result',
  templateUrl: './assessment-result.component.html',
  styleUrls: ['./assessment-result.component.scss']
})

export class AssessmentResultComponent implements OnInit {

  selectedRowIndex1 = -1;
  selectedRowIndex2 = -1;
  assessmentForm: FormGroup;
  selectedRowIndex = -1;
  constructor(private _formBuilder:FormBuilder) { }
  assessmentRevisionColumns: string[] = ['select','Revision','SCIP_Applied','Assignment_Status','Owner','Activity','Date'];
  assessmentRevisionControlColumns: string[] = ['select','position','Control','Status','Assessment_Guidance','Assessment_Decisions','Corrective_Action'];
 // assessmentRevisionSource =  new MatTableDataSource<assessmentRevision>(assessmentRevision);
  dataSource = new MatTableDataSource<assessmentRevision>(assessmentRevision);
  selection = new SelectionModel<assessmentRevision>(true, []);
  assessmentRevisionControl = new MatTableDataSource<assessmentRevisionControl>(assessmentRevisionControl)
  assessmentRevisionDAColumns:string[] = ['select','position','Digital_Asset','Control_Result_Status','Inherit_Batch_Status','Assessment_Observation','Assessment_Decisions','Corrective_Action']
  assessmentRevisionDA =new MatTableDataSource<assessmentRevisionDA>(assessmentRevisionDA);
  AssessmentArtifactsColumns:string[] = ['position','Document_File_Name','Entity','External_Doc_File_Name','External_Doc_Length_External_Doc_Content_Type','Document']
  AssessmentArtifacts = new MatTableDataSource<assessmentArtifacts>(assessmentArtifacts)
  revisionArtifactsColumns:string[] = ['position','Document_File_Name','Entity','External_Doc_File_Name','External_Doc_Length_External_Doc_Content_Type','Document']
  revisionArtifacts = new MatTableDataSource<revisionArtifacts>(revisionArtifacts)

  ngOnInit(): void {
    this.assessmentForm = this._formBuilder.group({
      ControlList: [''],
      DA_list:[''],
      Batch_Name:[''],
      Description:[''],
      Assignment_Status:[''],
      Owner:[''],
      Status:[''],
      Creation_Date:['']
    });
  
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?:assessmentRevision ): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Revision + 1}`;
  }
  getRecord(stepper: MatStepper,row){
    // stepper.next();
    console.log(row)
    this.selectedRowIndex = row.position;

}
getAssesmentDA(stepper: MatStepper,row){
  this.selectedRowIndex2 = row.position
}
getAssesmentRevision(stepper: MatStepper,row){
  this.selectedRowIndex1 = row.Revision;
  console.log(row)

}
}

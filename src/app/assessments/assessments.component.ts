import { Component, OnInit, Optional, Inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { MatStepper } from '@angular/material/stepper';
import { validate } from 'json-schema';
import { Router } from '@angular/router';

export interface Groups {
  name: string;
  position: number;
  Purpose:string;
  Description:string
}
export interface DAList {
  position: number;

  DA_List:string;
  Description:string;
  Purpose:string;
}
export interface ControlList {
  position: number;

  ControlList:string;
  Description:string;
  Purpose:string;
}
export interface Assessment {
  position: number,
  Batch_Name:string;
  Description:string;
  ControlList:string;
  DA_List:string;
  Assignment_Status:string;
  Owner:string;
  Creation_Date:string;
}
const ELEMENT_DATA: Groups[] = [
  {position: 1, name: 'Common Controls NEI-08-09 Rev.6 Appendix-D', Purpose:'n/a', Description: 'n/a'},
  {position: 2, name: 'Common Controls NEI-08-09 Rev.6 Appendix-E', Purpose: 'n/a', Description: 'n/a'},
  
];
const DAList: DAList[] = [
  {position: 1,DA_List: 'System 1 DA 1 2', Purpose:'n/a', Description: 'n/a'},
  {position: 2,DA_List: 'n/a', Purpose: 'n/a', Description: 'n/a'},  
];
const ControlList: ControlList[] = [
  {position: 1,ControlList: 'E 1.x MEDIA PROTECTION', Purpose:'n/a', Description: 'n/a'},
  {position: 2,ControlList: 'E 2.x PERSONNEL SECURITY', Purpose: 'n/a', Description: 'n/a'},
  {position: 3,ControlList: 'E 3.x SYSTEM AND INFORMATION INTEGRITY', Purpose: 'n/a', Description: 'n/a'},
  {position: 4,ControlList: 'E 8.x CYBER SECURITY CONTINGENCY PLAN', Purpose: 'n/a', Description: 'n/a'},

];
const Assessment: Assessment[] = [
  {position: 1,Batch_Name:'Sept Patching Batch',Description:'n/a',ControlList: 'E 1.x MEDIA PROTECTION',DA_List:'System 1 DA 1 2',Assignment_Status:'Assigned To',Owner:'admin',Creation_Date:'09/03/2020'},
  {position: 2,Batch_Name:'Sept Patching Batch',Description:'n/a',ControlList: 'E 1.x MEDIA PROTECTION',DA_List:'System 1 DA 1 2',Assignment_Status:'Assigned To',Owner:'admin',Creation_Date:'09/03/2020'},
  {position: 3,Batch_Name:'Sept Patching Batch',Description:'n/a',ControlList: 'E 1.x MEDIA PROTECTION',DA_List:'System 1 DA 1 2',Assignment_Status:'Assigned To',Owner:'admin',Creation_Date:'09/03/2020'},
  {position: 4,Batch_Name:'Sept Patching Batch',Description:'n/a',ControlList: 'E 1.x MEDIA PROTECTION',DA_List:'System 1 DA 1 2',Assignment_Status:'Assigned To',Owner:'admin',Creation_Date:'09/03/2020'},
  {position: 5,Batch_Name:'Sept Patching Batch',Description:'n/a',ControlList: 'E 1.x MEDIA PROTECTION',DA_List:'System 1 DA 1 2',Assignment_Status:'Assigned To',Owner:'admin',Creation_Date:'09/03/2020'},
]
@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.component.html',
  styleUrls: ['./assessments.component.scss']
})
export class AssessmentsComponent implements OnInit {
  selectedDADetailRowIndex = -1;
  selectedDARowIndex = -1;
  selectedRowControlListIndex = -1;
  selectedControlListDetailRowIndex = -1;
  selectedAssessmentRowIndex = -1;
  user: { postions: number; userName: string; }[];
  selectedRowIndex = -1;
  isLinear = false;
  firstFormGroup: FormGroup
  secondFormGroup: FormGroup 
  isOptional = false;
  isEditable = false;
  panelOpenState = false;

  constructor(private _formBuilder: FormBuilder,public dialog: MatDialog,private route:Router) { }
  displayedColumns: string[] = ['select', 'position', 'name', 'Purpose', 'Description'];
  dataSource = new MatTableDataSource<Groups>(ELEMENT_DATA);
  DAListColumns: string[] = ['position','Actions', 'DAList', 'Description', 'Purpose'];
  DAListSource = new MatTableDataSource<DAList>(DAList);
  AssessmentSource = new MatTableDataSource<Assessment>(Assessment);
  ControlListColumns: string[] = ['position','Actions', 'ControlList', 'Description', 'Purpose'];
  AssessmentColumns: string[] = ['position','Batch_Name', 'Description','ControlList','DA_List','Assignment_Status','Owner','Creation_Date'];
  ControlListSource = new MatTableDataSource<ControlList>(ControlList);
  selection = new SelectionModel<Groups>(true, []);

  
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
  checkboxLabel(row?: Groups): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
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
  getDAList(row){
    console.log(row)
    this.selectedDARowIndex = row.position;

  }
  getDAListDetail(row){
    this.selectedDADetailRowIndex = row.position
  }
  getRecord(stepper: MatStepper,row){
    // stepper.next();
    console.log(row)
    this.selectedRowIndex = row.position;
}

getControlList(row){
  this.selectedRowControlListIndex = row.position
}
getControlListDetail(row){
  this.selectedControlListDetailRowIndex = row.position
}
getAssessment(row){
  this.selectedAssessmentRowIndex = row.position;

}
conductAssessment(){
  this.route.navigateByUrl('/AssessmentResult')
}
AssignTo(){
  this.user = [{postions:1,userName:'user1'},{postions:2,userName:'user2'},{postions:3,userName:'user3'}]
  const dialogRef = this.dialog.open(UserAssessmentListDialogContent, {
    data: this.user,
    width:'700px'
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');

  });
}
}
/* popup controller */
export interface UsersDialogData {
  postions:number
  userName:string
}
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'user_list-popup',
  templateUrl: '../_helpers/user_list_popup.html',

})
// tslint:disable-next-line: component-class-suffix
export class UserAssessmentListDialogContent {
  selectedRowIndex = -1;
  datas;
  dataSource: MatTableDataSource<UsersDialogData>;
  displayedColumns: string[] = [ 'postions', 'userName'];
  constructor(
      public dialogRef: MatDialogRef<UserAssessmentListDialogContent>,
      // @Optional() is used to prevent error if no data is passed
      @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersDialogData) {
       console.log(data);
       console.log(data);
      this.datas = data
      this.dataSource = new MatTableDataSource<UsersDialogData>(this.datas);
       console.log(this.dataSource);
  }
  doAction() {
      this.dialogRef.close(true);  
  }
  getSelectedUser(row){
    console.log(row)
    this.selectedRowIndex = row.postions
  }
  closeDialog() {
    this.dialogRef.close(false);
  }
}

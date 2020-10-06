import { Component, OnInit, Optional, Inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { MatStepper } from '@angular/material/stepper';
@Component({
  selector: 'app-walkdown',
  templateUrl: './walkdown.component.html',
  styleUrls: ['./walkdown.component.scss']
})
export class WalkdownComponent implements OnInit {

  isCompleted = false;
  user = [];
  ltQuestionsForm: FormGroup;
  isLTConnections: any;
  isInterConnections: boolean = false;
  isReviewStepShow: boolean = false;
  local_data: { Name: string; Location: string; IsDigital: any; ManualComponent: string; ECode: string; SerialNumber: string; EquipmentType: string; CDADefensiveSecurityLevelsLookupId: any; Manufacturer: string; ModelNumber: string; };
  walkDownForm: FormGroup;
  addForm: FormGroup;
  reviewForm: FormGroup;
  interConnectionForm: FormGroup
  isExist: boolean;
  secondFormGroup: FormGroup;
  cdaForm: FormGroup;
  dropDownData = [
    'N/A',
    'Yes',
    'No'
  ]
  constructor(private _formBuilder: FormBuilder,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cdaForm = this._formBuilder.group({
      cdaName: ['', Validators.required]
    });
    this.reviewForm = this._formBuilder.group({
      Name: ['', Validators.required],
      Location: [''],
      IsDigital: [''],
      ManualComponent: [''],
      ECode: ['', Validators.required],
      SerialNumber: ['', Validators.required],
      EquipmentType: ['', Validators.required],
      CDADefensiveSecurityLevelsLookupId: [''],
      Manufacturer: [''],
      ModelNumber: ['']

    });
    this.addForm = this._formBuilder.group({
      Name: ['', Validators.required],
      Location: [''],
      IsDigital: [''],
      ManualComponent: ['',],
      ECode: ['', Validators.required],
      SerialNumber: ['', Validators.required],
      EquipmentType: ['', Validators.required],
      CDADefensiveSecurityLevelsLookupId: [''],
      Manufacturer: [''],
      ModelNumber: ['']

    });
    this.walkDownForm = this._formBuilder.group({
      Name: [''],
      Location_Name: [''],
      System_Code:[''],
      SECTION:[''],
      Question_ID:[''],
      Hash:[''],
      Question_Statement:[''],
      Order:[''],
      Date:[''],
      TABLE_TOP:[''],
      WALK_DOWN:[''],
      COMMENTS_CAPTURED_DURING_THE_WALK_DOWN:[''],
      REFERNCE_ARTIFACTS:[''],
      Guidance:[''],
      OTHER_DETAILS:['']
    });

    this.interConnectionForm = this._formBuilder.group({
      Name: [''],
      Location_Name: [''],
      System_Code:[''],
      Physical_Port_ID:[''],
      Analog_Port:[''],
      Blocked_Digital_Port:[''],
      Used_Digital_Port:[''],
      Open_Digital_Port:[''],
      Digital_Port_Type:['']
    });
    this.ltQuestionsForm = this._formBuilder.group({
      Additional_Param1:[''],
      Additional_Param2:[''],
      Additional_Param3:[''],
      Additional_Param4:[''],
      Additional_Param5:[''],
      Additional_Param6:[''],
      Additional_Param7:[''],
      Additional_Param8:[''],
      Additional_Param9:[''],
      Additional_Param10:[''],

    })
    this.local_data = {
      Name: "DA-1",
      Location: "",
      IsDigital: null ,
      ManualComponent: "",
      ECode: "ECode MX Updated Live",
      SerialNumber: "TIC-297690",
      EquipmentType: "ICNTRL",
      CDADefensiveSecurityLevelsLookupId: null,
      Manufacturer: "",
      ModelNumber: "",

  }
  }
  get cda (){
    return this.cdaForm.controls
  }
  get add (){
    return this.addForm.controls
  }
  get review (){
    return this.reviewForm.controls
  }
  get walkDown (){
    return this.walkDownForm.controls
  }
  reset(){
    this.isReviewStepShow = false
  }
  
  checkCdaExist(){
    this.isExist = true
    console.log(this.cdaForm.value);
    const dialogRef = this.dialog.open(ReviewDialogContent, {
      data: {message:'Digitial Asset Found. Do you want to review the Asset or proceed with walkdow ?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.isReviewStepShow = result;
    });
  }
  
  save(stepper:MatStepper){
       
    const dialogRef = this.dialog.open(ReviewDialogContent, {
      data: {message:'Do You Want to InterConnections'}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.isInterConnections = result;
      this.isCompleted = result;
      if(this.isInterConnections){
        setTimeout(() => {           // or do some API calls/ Async events
          stepper.next();
         }, 1);
      }
 
    });
  }
  saveInterConnection(stepper:MatStepper){
    const dialogRef = this.dialog.open(ReviewDialogContent, {
      data: {message:'Do You Want to LT Questions'}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.isLTConnections = result;
      if(this.isLTConnections){
        setTimeout(() => {           // or do some API calls/ Async events
          stepper.next();
         }, 1);
      }
    });
  }
  LTQuestions(){

  }
  AssignTo(){
    this.user = [{postions:1,userName:'user1'},{postions:2,userName:'user2'},{postions:3,userName:'user3'}]
    const dialogRef = this.dialog.open(UserListDialogContent, {
      data: this.user,
      width:'700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isLTConnections = result;

    });
  }
}

/* popup controller */

export interface DialogData {
  message:string
}
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'review-popup',
  templateUrl: '../_helpers/review_popup.html',
})

// tslint:disable-next-line: component-class-suffix
export class ReviewDialogContent {

  constructor(
      public dialogRef: MatDialogRef<ReviewDialogContent>,
      // @Optional() is used to prevent error if no data is passed
      @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    

  }
  doAction() {
      this.dialogRef.close(true);  
  }

  closeDialog() {
    this.dialogRef.close(false);
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
  styleUrls: ['./walkdown.component.scss']

})
// tslint:disable-next-line: component-class-suffix
export class UserListDialogContent {
  selectedRowIndex = -1;
  datas;
  dataSource: MatTableDataSource<UsersDialogData>;
  displayedColumns: string[] = [ 'postions', 'userName'];
  constructor(
      public dialogRef: MatDialogRef<UserListDialogContent>,
      // @Optional() is used to prevent error if no data is passed
      @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersDialogData) {
       
      this.datas = data
      this.dataSource = new MatTableDataSource<UsersDialogData>(this.datas);
       console.log(this.dataSource);
  }
  doAction() {
      this.dialogRef.close(true);  
  }
  getSelectedUser(row){
    this.selectedRowIndex = row.postions
  }
  closeDialog() {
    this.dialogRef.close(false);
  }

}

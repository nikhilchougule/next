import { Component, OnInit, ViewChild, Optional, Inject } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScipService } from '../_services/scip.service';
import { IScips } from '../_models/scips.interface'
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControlName, FormControl } from '@angular/forms';
@Component({
  selector: 'app-scip',
  templateUrl: './scip.component.html',
  styleUrls: ['./scip.component.scss']
})
export class ScipComponent implements OnInit {
  data: IScips[];
  scipForm: FormGroup;
  dataSource: MatTableDataSource<IScips>;
  isLoadingResults = true;
  update: boolean = false;
  showSSEP:boolean = false
  dataLength: number = 0;
  obj1 = {
    ControlOrRequirementId: null, 
    // ComplexityCategoryId: 3,
AV1: null,
AV1_Degree: null,
AV1_Justification: "",
AV1_Value: null,
AV2: null,
AV2_Degree: null,
AV2_Justification: "",
AV2_Value: null,
AV3: null,
AV3_Degree: null,
AV3_Justification: "",
AV3_Value: null,
AV4: null,
AV4_Degree: null,
AV4_Justification: "",
AV4_Value: null,
AV5: null,
AV5_Degree: null,
AV5_Justification: "",
AV5_Value: null,
ActiveFlag: null,
AlternateControlExample: "",
Analysis: "",
AppliesTo: "",
AssessmentStatus: "",
CommanControlExample: "",
ControlApplicability: null,
CorrectiveAction: "",
Decision: "",
DecisionAnswerOptions: "",
Focus: "",
ImplementControl: null,
Observation: "",
Purpose: "",
UseAlternate: null
}
  constructor(private scip:ScipService,public dialog: MatDialog,private route: ActivatedRoute) { }
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
    @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] =
   ['Action','ComplexityCategoryId', 'ControlOrRequirementId', 'ControlApplicability', 'CorrectiveAction', 'CorrectiveActionAnswerOptions', 'CommanControlExample',
      'Decision', 'DecisionAnswerOptions', 'ImplementControl', 'Focus', 'Observation',
      'Purpose', 'UseAlternate', 'AppliesTo', 'Analysis', 'AlternateControlExample', 'ActiveFlag', 'AV1',
      'AV1_Degree', 'AV1_Justification', 'AV1_Value', 'AV2', 'AV2_Degree', 'AV2_Justification', 'AV2_Value',
      'AV3', 'AV3_Degree', 'AV3_Justification', 'AV3_Value', 'AV4', 'AV4_Degree', 'AV4_Justification', 'AV4_Value',
      'AV5', 'AV5_Degree', 'AV5_Justification', 'AV5_Value'];
      @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  ngOnInit(): void {
    this.route.data.subscribe(res =>{
        // this.scip.getScipData().subscribe((res: IScips[]) => {
          this.data = res.items;
          this.dataSource = new MatTableDataSource(this.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.dataLength = this.data.length
            this.isLoadingResults = false;
      })

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
}
viewScipsFields(){
    this.showSSEP = !this.showSSEP;
}
getDisplayedColumns(){
    // 'ComplexityCategoryId'
    if(this.showSSEP){
        return this.displayedColumns =  ['Action', 'ControlOrRequirementId', 'ControlApplicability', 'CorrectiveAction', 'CorrectiveActionAnswerOptions', 'CommanControlExample',
        'Decision', 'DecisionAnswerOptions', 'ImplementControl', 'Focus', 'Observation',
        'Purpose', 'UseAlternate', 'AppliesTo', 'Analysis', 'AlternateControlExample', 'ActiveFlag', 'AV1',
        'AV1_Degree', 'AV1_Justification', 'AV1_Value', 'AV2', 'AV2_Degree', 'AV2_Justification', 'AV2_Value',
        'AV3', 'AV3_Degree', 'AV3_Justification', 'AV3_Value', 'AV4', 'AV4_Degree', 'AV4_Justification', 'AV4_Value',
        'AV5', 'AV5_Degree', 'AV5_Justification', 'AV5_Value'];
        
    }else{
        return this.displayedColumns =  ['Action', 'ControlOrRequirementId', 'ControlApplicability', 'CorrectiveAction', 'CorrectiveActionAnswerOptions']
        
    }
}
openDialog(action: string, element: any) {
    element.action = action;
    
    const dialogRef = this.dialog.open(ScipsDialogContent, {
        data: element
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result.event === 'Add') {

            this.scip.addScipRecord(result.data).subscribe((res) => {
            })
        } else if (result.event === 'Update') {

            this.scip.updateScipRecord(result.data).subscribe((res) => {
            })
        } else if (result.event === 'Delete') {
            this.scip.deleteScipRecord(result.data).subscribe((res) => {
            })
        }
    });

}


}


/* popup controller */

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'Scips-popup',
  templateUrl: '../_helpers/scips-popup.html',
})
// tslint:disable-next-line: component-class-suffix
export class ScipsDialogContent {
  scipsForm: FormGroup;
  action: string;
  local_data: any;
  obj :IScips
  constructor(
      public dialogRef: MatDialogRef<ScipsDialogContent>,
      // @Optional() is used to prevent error if no data is passed
      @Optional() @Inject(MAT_DIALOG_DATA) public data: IScips) {
      //  console.log(data);
      this.local_data = { ...data };
      console.log(this.local_data);
      this.action = this.local_data.action;
      console.log(this.action)
      this.scipsForm = new FormGroup({
              'AV1':new FormControl(null),
              'AV1_Degree':new FormControl(null),
              'AV1_Justification':new FormControl(null),
              'AV1_Value':new FormControl(null),
              'AV2':new FormControl(null),
              'AV2_Degree':new FormControl(null),
              'AV2_Justification':new FormControl(null),
              'AV2_Value':new FormControl(null),
              'AV3':new FormControl(null),
              'AV3_Degree':new FormControl(null),
              'AV3_Justification':new FormControl(null),
              'AV3_Value':new FormControl(null),
              'AV4':new FormControl(null),
                'AV4_Degree':new FormControl(null),
                'AV4_Justification':new FormControl(null),
                'AV4_Value' :new FormControl(null),
                'AV5':new FormControl(null),
                'AV5_Degree':new FormControl(null),
                'AV5_Justification':new FormControl(null),
                'AV5_Value':new FormControl(null),
                'ActiveFlag':new FormControl(null),
                'AlternateControlExample':new FormControl(null),
                'Analysis':new FormControl(null),
                'AppliesTo':new FormControl(null),
                'AssessmentStatus':new FormControl(null),
                'CommanControlExample':new FormControl(null),
                'ComplexityCategoryId':new FormControl(null),
                'ControlApplicability':new FormControl(null),
                'ControlOrRequirementId':new FormControl(null),
                'CorrectiveAction':new FormControl(null),
                'CorrectiveActionAnswerOptions':new FormControl(null),
                'Decision':new FormControl(null),
                'DecisionAnswerOptions':new FormControl(null),
                'Focus':new FormControl(null),
                'ImplementControl':new FormControl(null),
                'Observation':new FormControl(null),
                'Purpose':new FormControl(null),
                'UseAlternate':new FormControl(null)                
              })
         
         
      
  }

  doAction() {
    //   console.log(this.scipsForm.value)
    //   if(this.local_data.action == 'Add'){
    //       this.obj = this.scipsForm.value;
    //     this.dialogRef.close({ event: this.action, data:this.obj });
    //   }else{
        delete this.local_data.action;
        this.obj = this.local_data;
        
        this.dialogRef.close({ event: this.action, data:this.obj });
    //   }
      
  }

  closeDialog() {
      this.dialogRef.close({ event: 'Cancel' });
  }

}
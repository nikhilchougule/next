import { Component, OnInit, ViewChild, Optional, Inject } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CriticalSystemService } from '../_services/critical-system.service';
import { ICriticalSystem } from '../_models/criticalSyst.interface'
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControlName, FormControl } from '@angular/forms';
@Component({
    selector: 'app-critical-system',
    templateUrl: './critical-system.component.html',
    styleUrls: ['./critical-system.component.css']
})
export class CriticalSystemComponent implements OnInit {
    csForm: FormGroup;
    dataSource: MatTableDataSource<ICriticalSystem>;
    isLoadingResults = true;
    update: boolean = false;
    dataLength: number = 0;
    data: ICriticalSystem[];
    obj = {
        Name: null, 
        SystemDescription: null,
           AdditionalParam11: null,
           AdditionalParam12: null,
           AdditionalParam13: null,
           AdditionalParam14: null,
           AdditionalParam15: null,
           AdditionalParam16: null,
           AdditionalParam17: null,
           AdditionalParam18: null,
           AdditionalParam19: null,
           AdditionalParam20: null,
           AdditionalParam21: null,
           AdditionalParam22: null,
           AdditionalParam23: null,
           AdditionalParam24: null,
           AdditionalParam25: null,
           AdditionalParam26: null,
           AdditionalParam27: null,
           AdditionalParam28: null,
           AdditionalParam29: null,
           AdditionalParam30: null,
           AdditionalParam31: null,
           AdditionalParam32: null,
           AdditionalParam33: null,
           AdditionalParam34: null,
           AdditionalParam35: null,
           AdditionalParam36: null,
           AdditionalParam37: null,
           AdditionalParam38: null,
           AdditionalParam39: null,
           AdditionalParam40: null,
           AdditionalParam41: null,
           AdditionalParam42: null,
           AdditionalParam43: null,
           AdditionalParam44: null,
           AdditionalParam45: null,
           AdditionalParam46: null,
           AdditionalParam47: null,
           AdditionalParam48: null,
           AdditionalParam49: null,
           AdditionalParam50: null,
           Additional_Param_1: null,
           Additional_Param_2: null,
           Additional_Param_3: null,
           Additional_Param_4: null,
           Additional_Param_5: null,
           Additional_Param_6: null,
           ApprovalStatus: null,
           CategoryId: null,
           CreatedBy: null,
           CreatedDate: null,
           EmergencyPlan: null,
           ExtDescription: null,
           IdentificationApprovalStatus: null,
           ImportantToSafety: null,
           InstallationDate: null,
           LocationId: null,
           MaintenanceRep: null,
           ModifiedBy: null,
           ModifiedDate: null,
           Notes: null,
           OperationsRep: null,
           RiskSignificant: null,
           SSEPApprovedBy: null,
           SSEPApprovedDate: null,
           SSEPApproverComment: null,
           SSEPDecisionBy: null,
           SSEPDecisionComment: null,
           SSEPDecisionDate: null,
           SSEPDetailedDescription: null,
           SSEPFunction: null,
           SSEPJustification: null,
           SSEPReviewDate: null,
           SSEPReviewedBy: null,
           SSEPReviewerComment: null,
           SafetyOrImportantToSafety: null,
           SafetyRelated: null,
           Security: null,
           Structure: null,
           SystemEngineer: null,
           SystemFunction: null,
   }
    constructor(private criticalSys: CriticalSystemService,public dialog: MatDialog,private route:ActivatedRoute) {
    }
    @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
    @ViewChild(MatSort) sort: MatSort;

    displayedColumns: string[] = ['Action','LocationId', 'Name', 'SystemDescription', 'CriticalSystemId', 'ApprovalStatus', 'CategoryId',
        'IdentificationApprovalStatus', 'Structure', 'SSEPDetailedDescription', 'Security', 'SafetyOrImportantToSafety',
        'EmergencyPlan', 'SafetyRelated', 'ImportantToSafety', 'ExtDescription', 'SSEPJustification', 'SSEPDecisionComment', 'SSEPDecisionDate',
        'SSEPDecisionBy', 'SSEPReviewerComment', 'SSEPReviewDate', 'SSEPReviewedBy', 'SSEPApproverComment', 'SSEPApprovedDate', 'SSEPApprovedBy'];
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

    ngOnInit(): void {
        
        this.route.data.subscribe(res =>{
            // this.cda.getCriticalDigitalAssetsData().subscribe((res: ICDA[]) => {
                this.data = res.items;
        // this.criticalSys.getCriticalSystemData().subscribe((res: ICriticalSystem[]) => {
            this.dataSource = new MatTableDataSource(this.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.dataLength = this.data.length
            this.isLoadingResults = false;
        })
    }
    getCriticalSystemData() {
        this.criticalSys.getCriticalSystemData().subscribe((res: ICriticalSystem[]) => {
            this.data = res;
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
    openDialog(action: string, element: any) {
        element.action = action;
        
        const dialogRef = this.dialog.open(CSDialogContent, {
            data: element
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result.event === 'Add') {

                this.criticalSys.addCriticalSystemRecord(result.data).subscribe((res) => {
                    this.getCriticalSystemData();
                })
            } else if (result.event === 'Update') {

                this.criticalSys.updateCriticalSystemRecord(result.data).subscribe((res) => {
                    this.getCriticalSystemData();
                })
            } else if (result.event === 'Delete') {
                this.criticalSys.deleteCriticalSystemRecord(result.data).subscribe((res) => {
                    this.getCriticalSystemData();
                })
            }
        });

    }


}

/* popup controller */

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'cs-popup',
    templateUrl: '../_helpers/critical-system-popup.html',
})
// tslint:disable-next-line: component-class-suffix
export class CSDialogContent {
    CSIdentificationApprovalStatus: any;
    csApprovalStatus: any;
    category: any;
    csForm: FormGroup;
    action: string;
    local_data: any;
    obj:ICriticalSystem
    location:any;
    constructor(
        public dialogRef: MatDialogRef<CSDialogContent>,
        // @Optional() is used to prevent error if no data is passed
        @Optional() @Inject(MAT_DIALOG_DATA) public data: ICriticalSystem,private csService:CriticalSystemService) {
        //  console.log(data);
        this.local_data = { ...data };
        this.action = this.local_data.action;
        this.csService.getLocations().subscribe((res)=>{
            this.location = res;
        })
        this.csService.getCategory().subscribe((res)=>{
            this.category = res;
        })
        this.csService.getCsApprovalStatus().subscribe((res)=>{
            this.csApprovalStatus = res;
        })
        this.csService.getCSIdentificationApprovalStatus().subscribe((res)=>{
            this.CSIdentificationApprovalStatus = res;
        })
        this.csForm = new FormGroup({
            // 'form1': new FormGroup({
                'LocationId':new FormControl(null),
                'Name':new FormControl(null),
                'SystemDescription':new FormControl(null),
                'CriticalSystemId':new FormControl(null),
                'ApprovalStatus':new FormControl(null),
                'CategoryId':new FormControl(null),
                'IdentificationApprovalStatus':new FormControl(null),
                'EmergencyPlan':new FormControl(null),
                'SafetyRelated':new FormControl(null),
                'ImportantToSafety':new FormControl(null),
                'ExtDescription':new FormControl(null),
                'Security':new FormControl(null),
                'SafetyOrImportantToSafety':new FormControl(null),

            // }),

        // 'form2': new FormGroup({
                'SSEPDetailedDescription':new FormControl(null),
                'SSEPJustification':new FormControl(null),
                'SSEPDecisionComment':new FormControl(null),
                'SSEPDecisionDate':new FormControl(null),
                'SSEPDecisionBy':new FormControl(null),
                'SSEPReviewerComment':new FormControl(null),
                'SSEPReviewDate':new FormControl(null),
                'SSEPReviewedBy':new FormControl(null),
                'SSEPApproverComment':new FormControl(null),
                'SSEPApprovedDate':new FormControl(null),
                'SSEPApprovedBy':new FormControl(null),
                'SSEPFunction':new FormControl(null),
            //   }),
        // 'form3': new FormGroup({
                'Additional_Param_1':new FormControl(null),
                'Additional_Param_2':new FormControl(null),
                'Additional_Param_3':new FormControl(null),
                'Additional_Param_4':new FormControl(null),
                'Additional_Param_5':new FormControl(null),
                'Additional_Param_6':new FormControl(null),
                'AdditionalParam11':new FormControl(null),
                'AdditionalParam12':new FormControl(null),
                'AdditionalParam13':new FormControl(null),
                'AdditionalParam14':new FormControl(null),
                'AdditionalParam15':new FormControl(null),
                'AdditionalParam16':new FormControl(null),
                'AdditionalParam17':new FormControl(null),
                'AdditionalParam18':new FormControl(null),
                'AdditionalParam19':new FormControl(null),
                'AdditionalParam20':new FormControl(null),
                'AdditionalParam21':new FormControl(null),
                'AdditionalParam22':new FormControl(null),
                'AdditionalParam23':new FormControl(null),
                'AdditionalParam24':new FormControl(null),
                'AdditionalParam25':new FormControl(null),
                'AdditionalParam26':new FormControl(null),
                'AdditionalParam27':new FormControl(null),
                'AdditionalParam28':new FormControl(null),
                'AdditionalParam29':new FormControl(null),
                'AdditionalParam30':new FormControl(null),
                'AdditionalParam31':new FormControl(null),
                'AdditionalParam32':new FormControl(null),
                'AdditionalParam33':new FormControl(null),
                'AdditionalParam34':new FormControl(null),
                'AdditionalParam35':new FormControl(null),
                'AdditionalParam36':new FormControl(null),
                'AdditionalParam37':new FormControl(null),
                'AdditionalParam38':new FormControl(null),
                'AdditionalParam39':new FormControl(null),
                'AdditionalParam40':new FormControl(null),
                'AdditionalParam41':new FormControl(null),
                'AdditionalParam42':new FormControl(null),
                'AdditionalParam43':new FormControl(null),
                'AdditionalParam44':new FormControl(null),
                'AdditionalParam45':new FormControl(null),
                'AdditionalParam46':new FormControl(null),
                'AdditionalParam47':new FormControl(null),
                'AdditionalParam48':new FormControl(null),
                'AdditionalParam49':new FormControl(null),
                'AdditionalParam50':new FormControl(null),

            // }),
                // 'form4': new FormGroup({
                  'Structure':new FormControl(null),
                  'CreatedBy':new FormControl(null),
                  'CreatedDate' :new FormControl(null),
                  'InstallationDate':new FormControl(null),
                  'MaintenanceRep':new FormControl(null),
                  'ModifiedBy':new FormControl(null),
                  'ModifiedDate':new FormControl(null),
                  'Notes':new FormControl(null),
                  'OperationsRep':new FormControl(null),
                  'RiskSignificant':new FormControl(null),
                  'SystemEngineer':new FormControl(null),
                  'SystemFunction':new FormControl(null)
                // })
           
           
        })
    }
    filterMyOptions(event){
        console.log(event);
        this.local_data.LocationId = event
    }
    dateChanged(event){
        console.log(event)
    }
    doAction() {
    //     console.log(this.csForm.value)
    //    if(this.action == 'Add'){
    //     this.dialogRef.close({ event: this.action, data: this.csForm.value });
    //    }else{
        delete this.local_data.action;
        this.obj = this.local_data
        this.dialogRef.close({ event: this.action, data: this.obj });
    //    }
       
    }

    closeDialog() {
        this.dialogRef.close({ event: 'Cancel' });
    }

}
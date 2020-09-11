import { Component, OnInit, ViewChild, Optional, Inject } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CriticalSystemService } from '../_services/critical-system.service';
import { ICriticalSystem } from '../_models/criticalSyst.interface'
import { MatSort } from '@angular/material/sort';
@Component({
    selector: 'app-critical-system',
    templateUrl: './critical-system.component.html',
    styleUrls: ['./critical-system.component.css']
})
export class CriticalSystemComponent implements OnInit {
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
    constructor(private criticalSys: CriticalSystemService, public dialog: MatDialog) {
    }
    @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
    @ViewChild(MatSort) sort: MatSort;

    displayedColumns: string[] = ['LocationId', 'Name', 'SystemDescription', 'CriticalSystemId', 'ApprovalStatus', 'CategoryId',
        'IdentificationApprovalStatus', 'Structure', 'SSEPDetailedDescription', 'Security', 'SafetyOrImportantToSafety',
        'EmergencyPlan', 'SafetyRelated', 'ImportantToSafety', 'ExtDescription', 'SSEPJustification', 'SSEPDecisionComment', 'SSEPDecisionDate',
        'SSEPDecisionBy', 'SSEPReviewerComment', 'SSEPReviewDate', 'SSEPReviewedBy', 'SSEPApproverComment', 'SSEPApprovedDate', 'SSEPApprovedBy', 'Action'];
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

    ngOnInit(): void {
        this.criticalSys.getCriticalSystemData().subscribe((res: ICriticalSystem[]) => {
            this.data = res;
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
    action: string;
    local_data: any;
    constructor(
        public dialogRef: MatDialogRef<CSDialogContent>,
        // @Optional() is used to prevent error if no data is passed
        @Optional() @Inject(MAT_DIALOG_DATA) public data: ICriticalSystem) {
        //  console.log(data);
        this.local_data = { ...data };
        console.log(this.local_data);
        this.action = this.local_data.action;
        console.log(this.action)

    }

    doAction() {
        delete this.local_data.action;
        this.dialogRef.close({ event: this.action, data: this.local_data });
    }

    closeDialog() {
        this.dialogRef.close({ event: 'Cancel' });
    }

}
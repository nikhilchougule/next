import { Component, OnInit, ViewChild, Optional, Inject, Output, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CdaService } from "../_services/cda.service";
import { ICDA } from '../_models/cda.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSort } from '@angular/material/sort';
export interface DialogData {
    action: string;
    local_data: any;
}

@Component({
    selector: 'app-view-cda',
    templateUrl: './view-cda.component.html',
    styleUrls: ['./view-cda.component.css']
})

export class ViewCdaComponent implements OnInit {

    dataSource: MatTableDataSource<ICDA>;
    isLoadingResults = true;
    update: boolean = false;
    dataLength: number = 0;
    data: ICDA[];
    
    constructor(private cda: CdaService, public dialog: MatDialog) {


    }
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;    
    searchText: any;
    displayedColumns: string[] =
        ['Name', 'Location', 'IsDigital', 'ManualComponent', 'ECode', 'SerialNumber', 'EquipmentType', 'CDADefensiveSecurityLevelsLookupId', 'Manufacturer', 'ModelNumber',
            'CDAOwner', 'CDAProcessSoftware1OrRevision', 'CDAProcessSoftware2OrRevision', 'PlannedReplacementModificationDate', 'HasthisComponentbeenEvaluated',
            'EmergencyPlan', 'Description', 'Room', 'Builiding', 'Elevation', 'ColumnLine', 'Azimuth', 'Area', 'PlantUnit', 'CDATypeId', 'Cyber_Security', 'Justification', 'RevisionNumber',
            'RevisionStatus', 'DateInstalled', 'Reconciled', 'ReconciledDate', 'ReconcilerName', 'CDAOrComponentType', 'CDADisplayOrderId', 'Action'];


    // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

    ngOnInit(): void {
        
        this.cda.getCriticalDigitalAssetsData().subscribe((res: ICDA[]) => {
            this.data = res;
            this.dataSource = new MatTableDataSource(this.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
    
            this.dataLength = this.data.length
            this.isLoadingResults = false;
        })

    }
    getDigitalAssets(){
        this.cda.getCriticalDigitalAssetsData().subscribe((res: ICDA[]) => {
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
        const dialogRef = this.dialog.open(CdaDialogContent, {
            data: element
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result.event === 'Add') {                
                // this.addRowData(result.data);
            } else if (result.event === 'Update') {       
             
                this.cda.updateCriticalDigitalAssetsRecord(result.data).subscribe((res) => {
                   this.getDigitalAssets()
                                })
                // this.updateRowData(result.data);
            } else if (result.event === 'Delete') {
                this.cda.deleteCriticalAssetsRecord(result.data).subscribe((res) => {
                    this.getDigitalAssets()
                })
            }
        });

    }


}

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'cda-popup',
    templateUrl: '../_helpers/cda-popup.html',
})
// tslint:disable-next-line: component-class-suffix
export class CdaDialogContent {
    secondFormGroup: FormGroup;
    firstFormGroup: FormGroup;
    action: string;
    local_data: any;
    obj:ICDA
    constructor(
        public dialogRef: MatDialogRef<CdaDialogContent>,
        // @Optional() is used to prevent error if no data is passed
        @Optional() @Inject(MAT_DIALOG_DATA) public data: ICDA,private _formBuilder: FormBuilder) {
        //  console.log(data);
        this.local_data = { ...data };
        this.action = this.local_data.action;
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required]
          });
          this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
          });

    }

    doAction() {
        
        delete this.local_data.action;
        this.dialogRef.close({ event: this.action, data: this.local_data });

    }

    closeDialog() {
        this.dialogRef.close({ event: 'Cancel' });
    }

}

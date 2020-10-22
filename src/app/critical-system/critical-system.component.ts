import { Component, OnInit, ViewChild, Optional, Inject } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CriticalSystemService } from '../_services/critical-system.service';
import { ICriticalSystem } from '../_models/criticalSyst.interface'
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControlName, FormControl, FormArray, Validators } from '@angular/forms';
import { AppState } from '../reducers';
import { Store, select } from '@ngrx/store';
import { map, auditTime, takeUntil } from 'rxjs/operators';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { isLoggedIn, isLoggedOut } from '../auth/auth.selector';
import { MatStepper } from '@angular/material/stepper';
@Component({
    selector: 'app-critical-system',
    templateUrl: './critical-system.component.html',
    styleUrls: ['./critical-system.component.css']
})
export class CriticalSystemComponent implements OnInit {

    controls: FormArray;
    allLocations;
    showSSEP: boolean = false
    displayedColumns: string[]
    csForm: FormGroup;
    dataSource: MatTableDataSource<ICriticalSystem>;
    isLoadingResults = true;
    update: boolean = false;
    dataLength: number = 0;
    data: ICriticalSystem[];
    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;
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

    constructor(private criticalSys: CriticalSystemService, public dialog: MatDialog, private route: ActivatedRoute, private store: Store<AppState>) {

    }
    list$: BehaviorSubject<ICriticalSystem[]> = new BehaviorSubject(this.data);
    CSIdentificationApprovalStatus: any;
    csApprovalStatus: any;
    category: any;
    action: string;
    local_data: any;
    location: any;
    dropdowndata = [{value:true},{value:false},{value:'N/A'}]

    @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
    @ViewChild(MatSort) sort: MatSort;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
    ngOnInit(): void {
        this.getLocationName(1)
        this.isLoggedIn$ = this.store
            .pipe(
                select(isLoggedIn)
            )
        this.isLoggedOut$ = this.store
            .pipe(
                select(isLoggedOut)
            )

        console.log(this.list$)
        this.route.data.subscribe(res => {
            // this.cda.getCriticalDigitalAssetsData().subscribe((res: ICDA[]) => {
            this.data = res.items;



            // this.criticalSys.getCriticalSystemData().subscribe((res: ICriticalSystem[]) => {
            this.dataSource = new MatTableDataSource(this.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.dataLength = this.data.length
            this.isLoadingResults = false;
            const toGroups = this.data.map(entity => {
                return new FormGroup({
                    'CriticalSystemId': new FormControl(entity.CriticalSystemId),
                    'Name': new FormControl(entity.Name, Validators.required),
                    'SystemDescription': new FormControl(entity.SystemDescription || 'n/a'),
                    'ApprovalStatus': new FormControl(entity.ApprovalStatus || 'n/a'),
                    'CategoryId': new FormControl(entity.CategoryId || 'n/a'),
                    'IdentificationApprovalStatus': new FormControl(entity.IdentificationApprovalStatus),
                    'SSEPDetailedDescription': new FormControl(entity.SSEPDetailedDescription),
                    'SSEPJustification': new FormControl(entity.SSEPJustification),
                    'SSEPDecisionComment': new FormControl(entity.SSEPDecisionComment),
                    'SSEPDecisionDate': new FormControl(entity.SSEPDecisionDate),
                    'SSEPDecisionBy': new FormControl(entity.SSEPDecisionBy),
                    'SSEPReviewerComment': new FormControl(entity.SSEPReviewerComment),
                    'SSEPReviewDate': new FormControl(entity.SSEPReviewDate),
                    'SSEPReviewedBy': new FormControl(entity.SSEPReviewedBy),
                    'SSEPApproverComment': new FormControl(entity.SSEPApproverComment),
                    'SSEPApprovedDate': new FormControl(entity.SSEPApprovedDate),
                    'SSEPApprovedBy': new FormControl(entity.SSEPApprovedBy),
                    'SSEPFunction': new FormControl(entity.SSEPFunction),
                    'EmergencyPlan': new FormControl(entity.EmergencyPlan),
                    'SafetyRelated': new FormControl(entity.SafetyRelated),
                    'ImportantToSafety': new FormControl(entity.ImportantToSafety),
                    'ExtDescription': new FormControl(entity.ExtDescription),
                    'Security': new FormControl(entity.Security),
                    'SafetyOrImportantToSafety': new FormControl(entity.SafetyOrImportantToSafety),
                    'Structure': new FormControl(entity.Structure || 'n/a'),
                }, { updateOn: "blur" });
            });

            this.controls = new FormArray(toGroups);
            this.criticalSys.getLocations().subscribe((res) => {
                this.location = res;
            })
            this.criticalSys.getCategory().subscribe((res) => {
                this.category = res;
            })
            this.criticalSys.getCsApprovalStatus().subscribe((res) => {
                this.csApprovalStatus = res;
            })
            this.criticalSys.getCSIdentificationApprovalStatus().subscribe((res) => {
                this.CSIdentificationApprovalStatus = res;
            })
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

    updateFielddata(index, field, csd) {
        const control = this.getControl(index, field);
        if (control.valid) {
        csd[field] = this.controls.at(index).get(field).value;
        this.criticalSys.updateCriticalSystemRecord(csd).subscribe((res) => {
            this.getCriticalSystemData();

        })
    }
        // const control = this.getControl(index, field);
        // if (control.valid) {
        //     // console.log(control)
        //     // console.log(this.controls.at(index))
        //         this.criticalSys.updateCriticalSystemRecord(this.controls.at(index).value).subscribe((res) => {
        //         })
        //     // this.data.update(index,field,control.value);
        //     // this.csForm.valueChanges.pipe(auditTime(5000),takeUntil(this.unsubscribe)).subscribe(
        //     //     formData => {
        //     //         console.log(formData)

        //     //     this.criticalSys.updateCriticalSystemRecord(this.obj).subscribe((res) => {
        //     //     })
        //     //     })
        // }

    }

    getControl(index, fieldName) {
        const a = this.controls.at(index).get(fieldName) as FormControl;
        return this.controls.at(index).get(fieldName) as FormControl;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    // ['Action','LocationId', 'Name', 'SystemDescription', 'CriticalSystemId', 'ApprovalStatus', 'CategoryId',
    //         'IdentificationApprovalStatus', 'Structure', 'SSEPDetailedDescription', 'Security', 'SafetyOrImportantToSafety',
    //         'EmergencyPlan', 'SafetyRelated', 'ImportantToSafety', 'ExtDescription', 'SSEPJustification', 'SSEPDecisionComment', 'SSEPDecisionDate',
    //         'SSEPDecisionBy', 'SSEPReviewerComment', 'SSEPReviewDate', 'SSEPReviewedBy', 'SSEPApproverComment', 'SSEPApprovedDate', 'SSEPApprovedBy'];
    getDisplayedColumns() {
        if (this.showSSEP) {
            return this.displayedColumns = [ 'Name', 'SystemDescription', 'ApprovalStatus',
                'IdentificationApprovalStatus', 'Structure', 'SSEPDetailedDescription', 'Security', 'SafetyOrImportantToSafety',
                'EmergencyPlan', 'SafetyRelated', 'ImportantToSafety', 'ExtDescription', 'SSEPJustification', 'SSEPDecisionComment', 'SSEPDecisionDate',
                'SSEPDecisionBy', 'SSEPReviewerComment', 'SSEPReviewDate', 'SSEPReviewedBy', 'SSEPApproverComment', 'SSEPApprovedDate', 'SSEPApprovedBy','Action'];
        } else {
            return this.displayedColumns = [ 'Name', 'SystemDescription', 'ApprovalStatus',
                'IdentificationApprovalStatus', 'Structure'];

        }
    }
    viewSSEP() {
        this.showSSEP = !this.showSSEP;
        this.getDisplayedColumns();
    }
    getLocationName(locationId) {
        this.criticalSys.getLocations().subscribe((res) => {
            this.allLocations = res;
            let data = this.allLocations.filter(function (obj) {
                return obj.LocationId == locationId;
            });
            console.log(data)
            return data[0].LocationName
        })
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
            } else {
                this.getCriticalSystemData();
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
    csForm: FormGroup;
    CSIdentificationApprovalStatus: any;
    csApprovalStatus: any;
    category: any;
    action: string;
    local_data: any;
    obj: ICriticalSystem
    location: any;
    private unsubscribe = new Subject<void>()

    constructor(
        public dialogRef: MatDialogRef<CSDialogContent>,
        // @Optional() is used to prevent error if no data is passed
        @Optional() @Inject(MAT_DIALOG_DATA) public data: ICriticalSystem, private csService: CriticalSystemService) {
        //  console.log(data);
        this.local_data = { ...data };
        this.action = this.local_data.action;
        this.csService.getLocations().subscribe((res) => {
            this.location = res;
        })
        this.csService.getCategory().subscribe((res) => {
            this.category = res;
        })
        this.csService.getCsApprovalStatus().subscribe((res) => {
            this.csApprovalStatus = res;
        })
        this.csService.getCSIdentificationApprovalStatus().subscribe((res) => {
            this.CSIdentificationApprovalStatus = res;
        })
        this.csForm = new FormGroup({
            // 'LocationId':new FormControl(null),
            'Name': new FormControl(null),
            'SystemDescription': new FormControl(null),
            'ApprovalStatus': new FormControl(null),
            'CategoryId': new FormControl(null),
            'IdentificationApprovalStatus': new FormControl(null),
            'SSEPDetailedDescription': new FormControl(null),
            'SSEPJustification': new FormControl(null),
            'SSEPDecisionComment': new FormControl(null),
            'SSEPDecisionDate': new FormControl(null),
            'SSEPDecisionBy': new FormControl(null),
            'SSEPReviewerComment': new FormControl(null),
            'SSEPReviewDate': new FormControl(null),
            'SSEPReviewedBy': new FormControl(null),
            'SSEPApproverComment': new FormControl(null),
            'SSEPApprovedDate': new FormControl(null),
            'SSEPApprovedBy': new FormControl(null),
            'SSEPFunction': new FormControl(null),
            'EmergencyPlan': new FormControl(null),
            'SafetyRelated': new FormControl(null),
            'ImportantToSafety': new FormControl(null),
            'ExtDescription': new FormControl(null),
            'Security': new FormControl(null),
            'SafetyOrImportantToSafety': new FormControl(null),
            'Structure': new FormControl(null),

        })

    }
    ngOnInit() {
        //     this.scipsForm.valueChanges.pipe(
        //         switchMap(formValue =>  this.scip.addScipRecord(formValue)
        // ),
        //         takeUntil(this.unsubscribe)
        //     ).subscribe(() => console.log('Saved'))
        //for auto save

        if (this.local_data.action == 'Update') {
            // this.csForm.valueChanges.pipe(auditTime(5000), takeUntil(this.unsubscribe)).subscribe(
            //     formData => {
            //         console.log(formData)
            //         console.log(this.local_data)
            //         delete this.local_data.action;
            //         this.obj = this.local_data
            //         this.csService.updateCriticalSystemRecord(this.obj).subscribe((res) => {
            //         })
            //     })
        }


    }
    ngOnDestroy() {
        this.unsubscribe.next()
    }
    filterMyOptions(event) {
        console.log(event);
        this.local_data.LocationId = event
    }
    dateChanged(event) {
        console.log(event)
    }
    callNextStepper(stepper: MatStepper) {
        console.log('call next step')
        stepper.next();
    }
    doAction() {
        delete this.local_data.action;
        this.obj = this.local_data
        this.dialogRef.close({ event: this.action, data: this.obj });
    }

    closeDialog() {
        this.dialogRef.close({ event: 'Cancel' });
    }

}
import { Component, OnInit, ViewChild, Optional, Inject, Output, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CdaService } from "../_services/cda.service";
import { ICDA } from '../_models/cda.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { DateAdapter } from '@angular/material/core';


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
    obj = {
       // CriticalDigitalAssetId: null,
       Name: "",
       AC_ProtectionLevel: null,
       AI_ProtectionLevel: null,
       ASME: null ,
       AV1: null ,
       AV1_Degree: null,
       AV1_Justification: null,
       AV1_Value: null,
       AV2: null ,
       AV2_Degree: null,
       AV2_Justification: null,
       AV2_Value: null,
       AV3: null ,
       AV3_Degree: null,
       AV3_Justification: null,
       AV3_Value: null,
       AV4: null ,
       AV4_Degree: null,
       AV4_Justification: null,
       AV4_Value: null,
       AV5: null ,
       AV5_Degree: null,
       AV5_Justification: null,
       AV5_Value: null,
       AV_ProtectionLevel: null,
       AboveGround: null,
       AcccountTypesUsernamesGroups: null,
       AdditionalParam1: null,
       AdditionalParam2: null,
       AdditionalParam3: null,
       AdditionalParam4: null,
       AdditionalParam5: null,
       AdditionalParam6: null,
       AdditionalParam7: null,
       AdditionalParam8: null,
       AdditionalParam9: null,
       AdditionalParam10: null,
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
       AdditionalPhysicalSecurityAttributes: null,
       AppSWLocalUpdation: null,
       ApplicationSWInSQATool: null,
       ApplicationSWInstalled: null,
       ApplicationSWPasswordProtect: null,
       ApprovalStatus: "",
       Area: "",
       AssetId: null,
       AssociateMandTE: null,
       AudibleEventsCapability: null,
       AuditCapable: null,
       AuditLogCapability: null,
       AuditRecordCaptureMethod: null,
       AuditRecordContentsOrDescription: null,
       AuditRecordsCapable: null ,
       AuthenticatorSupport: null,
       Azimuth: "",
       BackupFrequency: null,
       BackupLocationsForCriticalCDASoftware: null,
       BackupPrimaryLocation: null,
       BackupSecondaryLocation: null,
       BackupsPerformed: null,
       Building: null,
       Builiding: null,
       CDAComplexityCategory: "",
       CDAComponentDisplayOrderId: null,
       CDAConfigSettingsChangeableUsingLocalHMI: null,
       CDACurrentStatusId: null,
       CDADefensiveSecurityLevelsLookupId: null,
       CDADisplayOrderId: null,
       CDAFunctionId: null,
       CDAHasHMI: null,
       CDAOperationalParametersChangeableUsingLocalHMI: null,
       CDAOrComponentType: "",
       CDAOwner: null,
       CDAPhysicalSecurityZoneLookupId: null,
       CDAPrimaryCategoryLookupId: null,
       CDAProcessSoftware1OrRevision: null,
       CDAProcessSoftware2OrRevision: null,
       CDAProcessSoftware3OrRevision: null,
       CDASecurity: "",
       CDASecurityFunctionInteraction: null,
       CDATag: null,
       CDATypeId: null,
       CI_ProtectionLevel: null,
       CMS: null,
       CameraMonitored: null,
       CollaborativeComputingCapability: null,
       CollaborativeComputingDisabled: null,
       CollaborativeUnitList: null,
       ColumnLine: "",
       CommunicationAcrossDefensiveLevel: null,
       CommunicationPorts: null,
       CreatedBy: null,
       CreatedDate: "",
       CriticalSystemId: null,
       CryptographicKeyFunctionUsesOrSupport: null,
       CurrentStatusDate: "",
       CyberControlPeriodicity: null,
       CyberSecurityRequirements: "",
       Cyber_Security: null ,
       DAUserAccessLevelsCapabilities: null,
       DNSCapable: null,
       DNSClientOrServer: null,
       DNSEnabled: null,
       DREId: null,
       DateInstalled: "",
       Description: "",
       DesignConfigReferences: null,
       DigitalDisplayOrSignage: null,
       DigitalPathways: null,
       DigitallyConnectedMaintToolsRequirement: null,
       DomainBasedAuthenticationCapability: null,
       ECAddition: null,
       ECModification: null,
       ECRetirement: null,
       ECode: "",
       Elevation: null,
       EmergencyPlan: null,
       EntityAssignmentStatusId: null,
       EquipmentType: "",
       EventsCaptured: null,
       FWLocalUpdationCapability: null,
       FWOrSWBackupCapability: null,
       FWOrSWPatchingCapability: null,
       FWinSQATool: null,
       FirewallSoftwareOrPacketFilteringSupportOrUse: null,
       FirmwareRevisionOrIdentifier: null,
       FirmwareVersion: null,
       HIDSCapable: null,
       HIDSProtocolConfiguration: null,
       HMIAccessControlCapable: null,
       HasFirmware: null,
       HasIPAddress: null,
       HasOpeartingSystem: null,
       HasremovableMedia: null ,
       HasthisComponentbeenEvaluated: null ,
       II_ProtectionLevel: null,
       IMAA: null,
       IPAddress: null,
       IdentificationApprovalStatus: null,
       ImpactClassification: "",
       IsDigital: null ,
       IsItCDA: null ,
       Justification: "",
       Location: "",
       LockableCabinet: null,
       LockedCabinet: null,
       LockedCabinetAdminKeyControl: null,
       LockedRoom: null,
       LockedRoomAdminKeyControl: null,
       LockedRoomKeyCardAccess: null,
       LogicalAccountsImplementation: null,
       MalwareDefinitionsUpdated: null,
       MalwareDetectionSWInstalled: null,
       Manned: null,
       ManualComponent: "",
       Manufacturer: "",
       MobileCodeExecutionConfiguration: null,
       MobileCodeExecutionTechnicalCapability: null,
       ModelNumber: "",
       ModelOptions: null,
       ModemInstalled: null,
       ModifiedBy: "",
       ModifiedDate: "",
       MultipleAccountSupportConfiguration: null,
       MultipleAccountsSupportCapability: null,
       MultipleConnectionNetwork: null,
       NetworkCommunnicationProtocols: null,
       NetworkDataCommunicationWithExtCDAorDAds: null ,
       NetworkOrSystemProectionDetails: null,
       OSServicePackInstalled: null,
       OSServicePackList: null,
       OSSoftwareSQATool: null,
       OSType: null,
       OSVersion: null,
       OperatingSWRevision: null,
       OperatorSecurityRoundsProcedure: null,
       PDMProgramMaintTools: null,
       PKICertificateUse: null,
       PMD: null,
       PM_WO_RWT_AR: null,
       PR_ProtectionLevel: null,
       PartNumber: null,
       PasswordCapable: null,
       PasswordImplementation: null,
       PasswordProtectFW: null,
       PasswordProtection: null ,
       PasswordSupportCapability: null,
       PatchingPerformed: null,
       PatchingSourcesList: null,
       PhysicalDevices: null,
       PhysicalSecurityLocation: null,
       PlannedReplacementModificationDate: null,
       PlantUnit: "",
       PortableMediaCapable: null,
       PortableRemoteControlDevicesInventory: null,
       PrimaryIP: null,
       PrimaryMeansOfRestoration: null,
       ProcedureReferenceList: null,
       Procedures: null,
       ProductControls: null,
       ProtectsOtherCDAs: null,
       ProtocolsInUse: null,
       Reconciled: null ,
       ReconciledDate: "",
       ReconcilerName: "",
       RecordStatus: null,
       RecordStatusDate: null,
       RecordStatusDetails: null,
       RemoteControlCapability: null,
       RemoteControlDisabled: null,
       RemovableMediaTypeList: null,
       RespMaintTechGroup: null,
       RevisionNumber: "",
       RevisionStatus: "",
       Room: null,
       SC_ProtectionLevel: null,
       SGIStoresAndProcesses: null,
       SSEPFunctions: null,
       SSEP_EOP: null,
       SSEP_EP: null ,
       SSEP_ITS_AugmentedQuality: null,
       SSEP_ITS_ImpactsReactivity: null ,
       SSEP_SEC: null ,
       SSEP_SafetyRelated: null ,
       SSEP_Support: null ,
       SWItemNumber: null,
       SWItemNumberAppSW: null,
       SWItemNumberFW: null,
       SafetyClassDetails: null,
       ScreenedSubnetFirewall: null,
       SecuritySpecificHWorSW: null,
       SerialDataCommunicationProtocols: null,
       SerialDataCommunicationWithExtCDAorDAs: null ,
       SerialNumber: "",
       SessionLockCapability: null,
       SessionLockOccurance: null,
       StatusDetails: null,
       SupportsAccounts: null,
       SupportsAuditing: null,
       SupportsLogicalAccounts: null,
       SuuportsEncryption: null,
       SystemNotificationDisplayed: null,
       TamperAlarmedCabinet: null,
       TamperAlarmedCabinetAdminKeyControl: null,
       TimeSource: null,
       TimeSyncCapability: null,
       UI_ProtectionLevel: null,
       VendorMaintained: null ,
       VendorRestrictions: null,
       WirelessCapability: null,
       WirelessCapable: null,
       WirelessDisabled: "",
       WirelessTypesList: null,
    }
    value: ICDA;
    dataSource: MatTableDataSource<ICDA>;
    isLoadingResults = true;
    update: boolean = false;
    dataLength: number = 0;
    data: ICDA[];
    
    constructor(private cda: CdaService, public dialog: MatDialog,private route: ActivatedRoute) {


    }
    // @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;    
    searchText: any;
    showAllFields:boolean = false;
    displayedColumns: string[] ;


    @ViewChild(MatPaginator, { static: true, }) paginator: MatPaginator = Object.create(null);

    ngOnInit(): void {
        this.route.data.subscribe(res =>{
        // this.cda.getCriticalDigitalAssetsData().subscribe((res: ICDA[]) => {
            this.data = res.items;
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
    getCDADisplayedColumns(){
        if(this.showAllFields){
           return this.displayedColumns =
            [ 'Action','Name', 'Location', 'IsDigital', 'ManualComponent', 'ECode', 'SerialNumber', 'EquipmentType', 'CDADefensiveSecurityLevelsLookupId', 'Manufacturer', 'ModelNumber',
                'CDAOwner', 'CDAProcessSoftware1OrRevision', 'CDAProcessSoftware2OrRevision', 'PlannedReplacementModificationDate', 'HasthisComponentbeenEvaluated',
                'EmergencyPlan', 'Description', 'Room', 'Builiding', 'Elevation', 'ColumnLine', 'Azimuth', 'Area', 'PlantUnit', 'CDATypeId', 'Cyber_Security', 'Justification', 'RevisionNumber',
                'RevisionStatus', 'DateInstalled', 'Reconciled', 'ReconciledDate', 'ReconcilerName', 'CDAOrComponentType', 'CDADisplayOrderId'];
    
        }else{
            return this.displayedColumns =
            [ 'Action','Name', 'Location', 'IsDigital', 'ManualComponent', 'ECode', 'SerialNumber', 'EquipmentType'];
    
        }
    }
    viewDAFields(){
        this.showAllFields = !this.showAllFields;
        this.getCDADisplayedColumns(); 
    }
    openDialog(action: string, element: any) {
        element.action = action;
        const dialogRef = this.dialog.open(CdaDialogContent, {
            data: element
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(result.data)
            if (result.event === 'Add') {   
                this.value  = result.data;
                console.log(this.value);             
                this.cda.addCriticalDigitalAssetsRecord(this.value).subscribe((res) => {
                    this.getDigitalAssets()
                  })
            } else if (result.event === 'Update') {       
             
                this.cda.updateCriticalDigitalAssetsRecord(result.data).subscribe((res) => {
                   this.getDigitalAssets()
                 })
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
        @Optional() @Inject(MAT_DIALOG_DATA) public data: ICDA,private _formBuilder: FormBuilder,private dateAdapter: DateAdapter<any>,) {
        //  console.log(data);
        // this.dateAdapter.setLocale('en-US');
        this.local_data = { ...data };
        this.action = this.local_data.action;
       
    }
     onDate(event): void {
         console.log(event)
        this.local_data.DateInstalled = event;
      }
    doAction() {
        delete this.local_data.action;
        this.obj = this.local_data
        var obj1 = {
            AC_ProtectionLevel: null,
            AI_ProtectionLevel: null,
            ASME: null,
            AV1: null,
            AV1_Degree: null,
            AV1_Justification: null,
            AV1_Value: null,
            AV2: null,
            AV2_Degree: null,
            AV2_Justification: null,
            AV2_Value: null,
            AV3: null,
            AV3_Degree: null,
            AV3_Justification: null,
            AV3_Value: null,
            AV4: null,
            AV4_Degree: null,
            AV4_Justification: null,
            AV4_Value: null,
            AV5: null,
            AV5_Degree: null,
            AV5_Justification: null,
            AV5_Value: null,
            AV_ProtectionLevel: null,
            AboveGround: null,
            AcccountTypesUsernamesGroups: null,
            AdditionalParam1: null,
            AdditionalParam2: null,
            AdditionalParam3: null,
            AdditionalParam4: null,
            AdditionalParam5: null,
            AdditionalParam6: null,
            AdditionalParam7: null,
            AdditionalParam8: null,
            AdditionalParam9: null,
            AdditionalParam10: null,
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
            AdditionalPhysicalSecurityAttributes: null,
            AppSWLocalUpdation: null,
            ApplicationSWInSQATool: null,
            ApplicationSWInstalled: null,
            ApplicationSWPasswordProtect: null,
            ApprovalStatus: "Not Approved",
            Area: "Area",
            AssetId: null,
            AssociateMandTE: null,
            AudibleEventsCapability: null,
            AuditCapable: null,
            AuditLogCapability: null,
            AuditRecordCaptureMethod: null,
            AuditRecordContentsOrDescription: null,
            AuditRecordsCapable: null,
            AuthenticatorSupport: null,
            Azimuth: "Azimuth",
            BackupFrequency: null,
            BackupLocationsForCriticalCDASoftware: null,
            BackupPrimaryLocation: null,
            BackupSecondaryLocation: null,
            BackupsPerformed: null,
            Building: null,
            Builiding: null,
            CDAComplexityCategory: " Default",
            CDAComponentDisplayOrderId: 0,
            CDAConfigSettingsChangeableUsingLocalHMI: null,
            CDACurrentStatusId: 12,
            CDADefensiveSecurityLevelsLookupId: 5,
            CDADisplayOrderId: 0,
            CDAFunctionId: 1,
            CDAHasHMI: null,
            CDAOperationalParametersChangeableUsingLocalHMI: null,
            CDAOrComponentType: "CDA",
            CDAOwner: null,
            CDAPhysicalSecurityZoneLookupId: 1,
            CDAPrimaryCategoryLookupId: 13,
            CDAProcessSoftware1OrRevision: null,
            CDAProcessSoftware2OrRevision: null,
            CDAProcessSoftware3OrRevision: null,
            CDASecurity: "YES",
            CDASecurityFunctionInteraction: null,
            CDATag: null,
            CDATypeId: 53,
            CI_ProtectionLevel: null,
            CMS: null,
            CameraMonitored: null,
            CollaborativeComputingCapability: null,
            CollaborativeComputingDisabled: null,
            CollaborativeUnitList: null,
            ColumnLine: "gsdgvss",
            CommunicationAcrossDefensiveLevel: null,
            CommunicationPorts: null,
            CreatedBy: null,
            CreatedDate: "2018-06-06T00:00:00",
            // CriticalDigitalAssetId: 1,
            CriticalSystemId: 1,
            CryptographicKeyFunctionUsesOrSupport: null,
            CurrentStatusDate: "1998-11-12T00:00:00",
            CyberControlPeriodicity: null,
            CyberSecurityRequirements: "Special Cyber Requirements",
            Cyber_Security: null,
            DAUserAccessLevelsCapabilities: null,
            DNSCapable: null,
            DNSClientOrServer: null,
            DNSEnabled: null,
            DREId: 3,
            DateInstalled: "2018-03-24T00:00:00",
            Description: "ELECTRONIC PROGRAMMABLE  THERMOSTAT FOR VUC-25",
            DesignConfigReferences: null,
            DigitalDisplayOrSignage: null,
            DigitalPathways: null,
            DigitallyConnectedMaintToolsRequirement: null,
            DomainBasedAuthenticationCapability: null,
            ECAddition: null,
            ECModification: null,
            ECRetirement: null,
            ECode: "ECode MX Updated Live",
            Elevation: null,
            EmergencyPlan: null,
            EntityAssignmentStatusId: 5,
            EquipmentType: "ICNTRL",
            EventsCaptured: null,
            FWLocalUpdationCapability: null,
            FWOrSWBackupCapability: null,
            FWOrSWPatchingCapability: null,
            FWinSQATool: null,
            FirewallSoftwareOrPacketFilteringSupportOrUse: null,
            FirmwareRevisionOrIdentifier: null,
            FirmwareVersion: null,
            HIDSCapable: null,
            HIDSProtocolConfiguration: null,
            HMIAccessControlCapable: null,
            HasFirmware: null,
            HasIPAddress: null,
            HasOpeartingSystem: null,
            HasremovableMedia: null,
            HasthisComponentbeenEvaluated: null,
            II_ProtectionLevel: null,
            IMAA: null,
            IPAddress: null,
            IdentificationApprovalStatus: null,
            ImpactClassification: "New Class1",
            IsDigital: null,
            IsItCDA: null,
            Justification: "justifications",
            Location: "Live Location",
            LockableCabinet: null,
            LockedCabinet: null,
            LockedCabinetAdminKeyControl: null,
            LockedRoom: null,
            LockedRoomAdminKeyControl: null,
            LockedRoomKeyCardAccess: null,
            LogicalAccountsImplementation: null,
            MalwareDefinitionsUpdated: null,
            MalwareDetectionSWInstalled: null,
            Manned: null,
            ManualComponent: "NO",
            Manufacturer: "Manu API",
            MobileCodeExecutionConfiguration: null,
            MobileCodeExecutionTechnicalCapability: null,
            ModelNumber: "2ET04700224",
            ModelOptions: null,
            ModemInstalled: null,
            ModifiedBy: "",
            ModifiedDate: "2020-03-31T15:09:32.27",
            MultipleAccountSupportConfiguration: null,
            MultipleAccountsSupportCapability: null,
            MultipleConnectionNetwork: null,
            Name: "DA-1",
            NetworkCommunnicationProtocols: null,
            NetworkDataCommunicationWithExtCDAorDAds: null,
            NetworkOrSystemProectionDetails: null,
            OSServicePackInstalled: null,
            OSServicePackList: null,
            OSSoftwareSQATool: null,
            OSType: null,
            OSVersion: null,
            OperatingSWRevision: null,
            OperatorSecurityRoundsProcedure: null,
            PDMProgramMaintTools: null,
            PKICertificateUse: null,
            PMD: null,
            PM_WO_RWT_AR: null,
            PR_ProtectionLevel: null,
            PartNumber: null,
            PasswordCapable: null,
            PasswordImplementation: null,
            PasswordProtectFW: null,
            PasswordProtection: null,
            PasswordSupportCapability: null,
            PatchingPerformed: null,
            PatchingSourcesList: null,
            PhysicalDevices: null,
            PhysicalSecurityLocation: null,
            PlannedReplacementModificationDate: null,
            PlantUnit: "Plant_Unit",
            PortableMediaCapable: null,
            PortableRemoteControlDevicesInventory: null,
            PrimaryIP: null,
            PrimaryMeansOfRestoration: null,
            ProcedureReferenceList: null,
            Procedures: null,
            ProductControls: null,
            ProtectsOtherCDAs: null,
            ProtocolsInUse: null,
            Reconciled: null,
            ReconciledDate: "2018-03-29T12:23:59",
            ReconcilerName: "Admin",
            RecordStatus: null,
            RecordStatusDate: null,
            RecordStatusDetails: null,
            RemoteControlCapability: null,
            RemoteControlDisabled: null,
            RemovableMediaTypeList: null,
            RespMaintTechGroup: null,
            RevisionNumber: "000",
            RevisionStatus: "ISSUED",
            Room: null,
            SC_ProtectionLevel: null,
            SGIStoresAndProcesses: null,
            SSEPFunctions: null,
            SSEP_EOP: null,
            SSEP_EP: null,
            SSEP_ITS_AugmentedQuality: null,
            SSEP_ITS_ImpactsReactivity: null,
            SSEP_SEC: null,
            SSEP_SafetyRelated: null,
            SSEP_Support: null,
            SWItemNumber: null,
            SWItemNumberAppSW: null,
            SWItemNumberFW: null,
            SafetyClassDetails: null,
            ScreenedSubnetFirewall: null,
            SecuritySpecificHWorSW: null,
            SerialDataCommunicationProtocols: null,
            SerialDataCommunicationWithExtCDAorDAs: null,
            SerialNumber: "TIC-297690",
            SessionLockCapability: null,
            SessionLockOccurance: null,
            StatusDetails: null,
            SupportsAccounts: null,
            SupportsAuditing: null,
            SupportsLogicalAccounts: null,
            SuuportsEncryption: null,
            SystemNotificationDisplayed: null,
            TamperAlarmedCabinet: null,
            TamperAlarmedCabinetAdminKeyControl: null,
            TimeSource: null,
            TimeSyncCapability: null,
            UI_ProtectionLevel: null,
            VendorMaintained: null,
            VendorRestrictions: null,
            WirelessCapability: null,
            WirelessCapable: null,
            WirelessDisabled: "yes",
            WirelessTypesList: null,
        }
        this.dialogRef.close({ event: this.action, data: this.obj });

    }

    closeDialog() {
        this.dialogRef.close({ event: 'Cancel' });
    }

}

export interface ICDA {
    
    CriticalDigitalAssetId:Number,
    Name:String,
    Description:String,
    Location:String,
    Manufacturer:String,
    ModelNumber:String,
    PartNumber:String,
    SerialNumber:String,
    ASME:String,
    Area:String,
    Elevation:String,
    Room:String,
    Builiding:String, 
    IsDigital: Boolean, 
    ManualComponent:String,
    ECode:String,
    EquipmentType:String,
    CDADefensiveSecurityLevelsLookupId:String,
    AdditionalParam1:String
    AdditionalParam2:String
    AdditionalParam3:String
    AdditionalParam4:String
    AdditionalParam5:String
    AdditionalParam6:String
    AdditionalParam7:String
    AdditionalParam8:String
    AdditionalParam9:String
    AdditionalParam10:String
    AdditionalParam11:String
    AdditionalParam12:String
    AdditionalParam13:String
    AdditionalParam14:String
    AdditionalParam15:String
    AdditionalParam16:String
    AdditionalParam17:String
    AdditionalParam18:String
    AdditionalParam19:String
    AdditionalParam20:String
    AdditionalParam21:String
    AdditionalParam22:String
    AdditionalParam23:String
    AdditionalParam24:String
    AdditionalParam25:String
    AdditionalParam26:String
    AdditionalParam27:String
    AdditionalParam28:String
    AdditionalParam29:String
    AdditionalParam30:String
    AdditionalParam31:String
    AdditionalParam32:String
    AdditionalParam33:String
    AdditionalParam34:String
    AdditionalParam35:String
    AdditionalParam36:String
    AdditionalParam37:String
    AdditionalParam38:String
    AdditionalParam39:String
    AdditionalParam40:String
    AdditionalParam41:String
    AdditionalParam42:String
    AdditionalParam43:String
    AdditionalParam44:String
    AdditionalParam45:String
    AdditionalParam46:String
    AdditionalParam47:String
    AdditionalParam48:String
    AdditionalParam49:String
    AdditionalParam50:String
    AC_ProtectionLevel: String
    AI_ProtectionLevel: String
    AV1: Boolean
    AV1_Degree: String
    AV1_Justification: String
    AV1_Value: String
    AV2: Boolean
    AV2_Degree: String
    AV2_Justification: String
    AV2_Value: String
    AV3: Boolean
    AV3_Degree: String
    AV3_Justification: String
    AV3_Value: String
    AV4: Boolean
    AV4_Degree: String
    AV4_Justification: String
    AV4_Value: String
    AV5: Boolean
    AV5_Degree: String
    AV5_Justification: String
    AV5_Value: String
    AV_ProtectionLevel: String
    AboveGround: String
    AcccountTypesUsernamesGroups: String
    AdditionalPhysicalSecurityAttributes: String
    AppSWLocalUpdation: String
    ApplicationSWInSQATool: String
    ApplicationSWInstalled: String
    ApplicationSWPasswordProtect: String
    ApprovalStatus: String
    AssetId: String
    AssociateMandTE: String
    AudibleEventsCapability: String
    AuditCapable: String
    AuditLogCapability: String
    AuditRecordCaptureMethod: String
    AuditRecordContentsOrDescription: String
    AuditRecordsCapable: Boolean
    AuthenticatorSupport: String
    Azimuth: String
    BackupFrequency: String
    BackupLocationsForCriticalCDASoftware: String
    BackupPrimaryLocation: String
    BackupSecondaryLocation: String
    BackupsPerformed: String
    Building: String
    CDAComplexityCategory: String
    CDAComponentDisplayOrderId: Number
    CDAConfigSettingsChangeableUsingLocalHMI: String
    CDACurrentStatusId: Number
    CDADisplayOrderId: Number
    CDAFunctionId: Number
    CDAHasHMI: String
    CDAOperationalParametersChangeableUsingLocalHMI: String
    CDAOrComponentType: String
    CDAOwner: String
    CDAPhysicalSecurityZoneLookupId: Number
    CDAPrimaryCategoryLookupId: Number
    CDAProcessSoftware1OrRevision: String
    CDAProcessSoftware2OrRevision: String
    CDAProcessSoftware3OrRevision: String
    CDASecurity: String
    CDASecurityFunctionInteraction: String
    CDATag: String
    CDATypeId: Number
    CI_ProtectionLevel: String
    CMS: String
    CameraMonitored: String
    CollaborativeComputingCapability: String
    CollaborativeComputingDisabled: String
    CollaborativeUnitList: String
    ColumnLine: String
    CommunicationAcrossDefensiveLevel: String
    CommunicationPorts: String
    CreatedBy: String
    CreatedDate: Date
    CriticalSystemId: Number
    CryptographicKeyFunctionUsesOrSupport: String
    CurrentStatusDate: Date
    CyberControlPeriodicity: String
    CyberSecurityRequirements: Date
    Cyber_Security: Boolean
    DAUserAccessLevelsCapabilities: String
    DNSCapable: String
    DNSClientOrServer: String
    DNSEnabled: String
    DREId: Number
    DateInstalled: Date
    DesignConfigReferences: String
    DigitalDisplayOrSignage: String
    DigitalPathways: String
    DigitallyConnectedMaintToolsRequirement: String
    DomainBasedAuthenticationCapability: String
    ECAddition: String
    ECModification: String
    ECRetirement: String
    EmergencyPlan: String
    EntityAssignmentStatusId: Number
    EventsCaptured: String
    FWLocalUpdationCapability: String
    FWOrSWBackupCapability: String
    FWOrSWPatchingCapability: String
    FWinSQATool: String
    FirewallSoftwareOrPacketFilteringSupportOrUse: String
    FirmwareRevisionOrIdentifier: String
    FirmwareVersion: String
    HIDSCapable: String
    HIDSProtocolConfiguration: String
    HMIAccessControlCapable: String
    HasFirmware: String
    HasIPAddress: String
    HasOpeartingSystem: String
    HasremovableMedia: Boolean
    HasthisComponentbeenEvaluated: Boolean
    II_ProtectionLevel: String
    IMAA: String
    IPAddress: String
    IdentificationApprovalStatus: String
    ImpactClassification: String
    IsItCDA: Boolean
    Justification:String 
    LockableCabinet: String
    LockedCabinet: String
    LockedCabinetAdminKeyControl: String
    LockedRoom: String
    LockedRoomAdminKeyControl: String
    LockedRoomKeyCardAccess: String
    LogicalAccountsImplementation: String
    MalwareDefinitionsUpdated: String
    MalwareDetectionSWInstalled: String
    Manned: String
    MobileCodeExecutionConfiguration: String
    MobileCodeExecutionTechnicalCapability: String
    ModelOptions: String
    ModemInstalled: String
    ModifiedBy:String
    ModifiedDate: Date
    MultipleAccountSupportConfiguration: String
    MultipleAccountsSupportCapability: String
    MultipleConnectionNetwork: String
    NetworkCommunnicationProtocols: String
    NetworkDataCommunicationWithExtCDAorDAds: Boolean
    NetworkOrSystemProectionDetails: String
    OSServicePackInstalled: String
    OSServicePackList: String
    OSSoftwareSQATool: String
    OSType: String
    OSVersion: String
    OperatingSWRevision: String
    OperatorSecurityRoundsProcedure: String
    PDMProgramMaintTools: String
    PKICertificateUse: String
    PMD: String
    PM_WO_RWT_AR: String
    PR_ProtectionLevel: String
    PasswordCapable: String
    PasswordImplementation: String
    PasswordProtectFW: String
    PasswordProtection: Boolean
    PasswordSupportCapability: String
    PatchingPerformed: String
    PatchingSourcesList: String
    PhysicalDevices: String
    PhysicalSecurityLocation: String
    PlannedReplacementModificationDate: String
    PlantUnit: String
    PortableMediaCapable: String
    PortableRemoteControlDevicesInventory: String
    PrimaryIP: String
    PrimaryMeansOfRestoration: String
    ProcedureReferenceList: String
    Procedures: String
    ProductControls: String
    ProtectsOtherCDAs: String
    ProtocolsInUse: String
    Reconciled: Boolean
    ReconciledDate: Date
    ReconcilerName: String
    RecordStatus: String
    RecordStatusDate: String
    RecordStatusDetails: String
    RemoteControlCapability: String
    RemoteControlDisabled: String
    RemovableMediaTypeList: String
    RespMaintTechGroup: String
    RevisionNumber: String
    RevisionStatus: String
    SC_ProtectionLevel: String
    SGIStoresAndProcesses: String
    SSEPFunctions: String
    SSEP_EOP: String
    SSEP_EP: Boolean
    SSEP_ITS_AugmentedQuality: String
    SSEP_ITS_ImpactsReactivity: Boolean
    SSEP_SEC: Boolean
    SSEP_SafetyRelated: Boolean
    SSEP_Support: Boolean
    SWItemNumber: String
    SWItemNumberAppSW: String
    SWItemNumberFW: String
    SafetyClassDetails: String
    ScreenedSubnetFirewall: String
    SecuritySpecificHWorSW: String
    SerialDataCommunicationProtocols: String
    SerialDataCommunicationWithExtCDAorDAs: Boolean
    SessionLockCapability: String
    SessionLockOccurance: String
    StatusDetails: String
    SupportsAccounts: String
    SupportsAuditing: String
    SupportsLogicalAccounts: String
    SuuportsEncryption: String
    SystemNotificationDisplayed: String
    TamperAlarmedCabinet: String
    TamperAlarmedCabinetAdminKeyControl: String
    TimeSource: String
    TimeSyncCapability: String
    UI_ProtectionLevel: String
    VendorMaintained: Boolean
    VendorRestrictions: String
    WirelessCapability: String
    WirelessCapable: String
    WirelessDisabled: String
    WirelessTypesList: String
    
}

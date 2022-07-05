export enum TableName {
    //Tables Name
    //app/model's
    CATEGORY = "Category",
    USER = 'User',
    DISH = 'Dish',
    COMPANY_PRICE = 'CompanyPrice',
    LOGGER = 'Logger',
    COMPANY_PC = 'CompanyPC',
    INFINITY_PRICE = 'InfinityPrice',
    INFINITY_PC = 'InfinityPC',
    RFID_HISTORY = 'RfidHistory',
    SKU_VALUE_HISTORY = 'skuValueHistory',
    //modules/model's
    IAV = 'Iav',
    GIA = 'Gia',
    COMPANY_CLIENT_SETTING = 'CompanyClientSetting',
    SETTING = 'Setting',
    LAB = 'Lab',
    COMPANY = 'Company',
    ROLE = 'Role',
    ADDRESS = 'Address',
    SKU = 'Sku',
    LAB_HISTORY = 'LabHistory',
    STATUS = 'Status',
    TEMPLATE = 'Template',
    DEVICE = 'Device',
    DEVICE_TYPE = 'DeviceType',
    ACL = 'Acl',
    ACL_MODULE = 'AclModule',
    ACL_ROLE_URL = 'AclRoleUrl',
    ACL_URL = 'AclUrl',
    ACL_USER_URL = 'AclUserUrl',
    ACTIVITY = 'Activity',
    PERMISSION = 'Permission',
    ACTIVITY_HISTORY = 'ActivityHistory',
    ALERT = 'Alert',
    ALERT_MASTER = 'AlertMaster',
    ATTRIBUTE = 'Attribute',
    BUSINESS = 'Business',
    CLIENT_PRICE = 'ClientPrice',
    COMMENT = 'Comment',
    COMPANY_SUB_TYPE = 'CompanySubType',
    COMPANY_TYPE = 'CompanyType',
    CONTACT = 'Contact',
    CRON = 'Cron',
    DIAMOND_MATCH = 'DiamondMatch',
    DIAMOND_MATCH_RULE = 'DiamondMatchRule',
    SCREEN_MASTER = 'ScreenMaster',
    DISPLAY_CONFIGURATION = 'DisplayConfiguration',
    ACTIVITY_DISPLAY_CONFIGURATION = 'ActivityDisplayConfiguration',
    SKU_DISPLAY_CONFIGURATION = 'SkuDisplayConfiguration',
    FILE_UPLOAD_HISTORY = 'FileUploadHistory',
    MOVEMENT_ACTIVITY = 'MovementActivity',
    RAP_PRICE = 'RapPrice',
    LOAN = 'Loan',
    RAW_ACTIVITY = 'RawActivity',
    RECIPIENT = 'Recipient',
    RFID = 'rfid',
    SESSION = 'Session',
    TRANSACTION = 'Transaction',
    TRANSIT = 'Transit',
    VERIFICATION = 'Verification',
    DEVICE_LOG = 'DeviceLog',
    DEVICE_COMMAND = 'DeviceCommand',
    SCHEDULE_REPORT = 'ScheduleReport',
    REGISTER_DEVICE = 'RegisterDevice',
    TRANSACTION_IMPORT = 'TransactionImport',
    TRANSACTION_IMPORT_REVIEW = "TransactionImportReview",
    TRANSACTION_IAV = "TransactionIav",
    TRANSACTION_SALE = "TransactionSale",
    TRANSACTION_CONSIGNMETNT = "TransactionConsignmet",     //Todo fix this typo mistake
    TRANSACTION_TRANSIT = "TransactionTransit",
    TRANSACTION_DIAMOND_MATCH = "TransactionDiamondMatch",
    SUMMARY_REPORT = "SummaryReport",
    DIAMOND_REGISTRATION = "DiamondRegistration",
    DEVICE_SOCKET_LOG = "DeviceSocketLog",
    LED_SELECTION = "LedSelection",
    RAP_NET_PRICE = "rapNetPrice",
    CARAT_MASTER = "caratMaster",
    STONE_TYPE_MASTER = "stoneTypeMaster",
    LAB_MASTER = "labMaster",
    FLUORESCENSE_MASTER = "fluorescenseMaster",
    MEASUREMENT_MASTER = "measurementsMaster",
    CLARITY_MASTER = "clarityMaster",
    CLARITY_RANGE = "clarityRange",
    COLOR_MASTER = "colorMaster",
    COLOR_RANGE = "colorRange"
}

export enum Tables {    //Todo work on this...
    //mongo Table Name
    //TableName.COMPANY_PRICE = 'companyprices',
    COMPANY_PRICE = 'CompanyPrice',
    COMPANY_PC = 'CompanyPC',
    INFINITY_PRICE = 'InfinityPrice',
    INFINITY_PC = 'InfinityPC',
    RFID_HISTORY = 'RfidHistory',
    SKU_VALUE_HISTORY = 'skuValueHistory',
    IAV = 'Iav',
    GIA = 'Gia',
    USER = 'User',
    LAB = 'Lab',
    COMPANY = 'Company',
    ROLE = 'Role',
    ADDRESS = 'Address',
    SKU = 'Sku',
    STATUS = 'Status',
    TEMPLATE = 'Template',
    DEVICE = 'Device',
    DEVICE_TYPE = 'DeviceType',
    ACL = 'Acl',
    ACL_MODULE = 'AclModule',
    ACL_ROLE_URL = 'AclRoleUrl',
    ACL_URL = 'AclUrl',
    ACL_USER_URL = 'AclUserUrl',
    ACTIVITY = 'Activity',
    PERMISSION = 'Permission',
    ACTIVITY_HISTORY = 'ActivityHistory',
    ALERT = 'Alert',
    ALERT_MASTER = 'AlertMaster',
    ATTRIBUTE = 'Attribute',
    BUSINESS = 'Business',
    CLIENT_PRICE = 'ClientPrice',
    COMMENT = 'Comment',
    COMPANY_SUB_TYPE = 'CompanySubType',
    COMPANY_TYPE = 'CompanyType',
    CONTACT = 'Contact',
    CRON = 'Cron',
    DIAMOND_MATCH = 'DiamondMatch',
    DIAMOND_MATCH_RULE = 'DiamondMatchRule',
    SCREEN_MASTER = 'ScreenMaster',
    DISPLAY_CONFIGURATION = 'DisplayConfiguration',
    ACTIVITY_DISPLAY_CONFIGURATION = 'ActivityDisplayConfiguration',
    SKU_DISPLAY_CONFIGURATION = 'SkuDisplayConfiguration',
    FILE_UPLOAD_HISTORY = 'FileUploadHistory',
    MOVEMENT_ACTIVITY = 'MovementActivity',
    RAP_PRICE = 'RapPrice',
    RAW_ACTIVITY = 'RawActivity',
    RECIPIENT = 'Recipient',
    RFID = 'rfid',
    SESSION = 'Session',
    TRANSACTION = 'Transaction',
    TRANSIT = 'Transit',
    VERIFICATION = 'Verification',
    DEVICE_LOG = 'DeviceLog',
    DEVICE_COMMAND = 'DeviceCommand',
    SCHEDULE_REPORT = 'ScheduleReport',
    REGISTER_DEVICE = 'RegisterDevice',
    TRANSACTION_IMPORT = 'TransactionImport',
    TRANSACTION_IMPORT_REVIEW = "TransactionImportReview",
    TRANSACTION_IAV = "TransactionIav",
    TRANSACTION_SALE = "TransactionSale",
    TRANSACTION_CONSIGNMETNT = "TransactionConsignmet",
    TRANSACTION_TRANSIT = "TransactionTransit",
    TRANSACTION_DIAMOND_MATCH = "TransactionDiamondMatch"
}
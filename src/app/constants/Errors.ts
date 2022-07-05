export class Errors {

    static readonly IS_REQUIRED: string = "is Required";
    static readonly INVALID_ID: string = "Invalid _id";
    static readonly INVALID_TO: string = "Invalid To";
    static readonly INVALID_FROM: string = "Invalid From";
    static readonly INVALID_OR_REQUIRED: string = "Invalid Or Required";
    static readonly INVALID_USER_ID: string = "Invalid UserId";
    static readonly INVALID_SKU_ID: string = "Invalid skuId";
    static readonly INVALID_LAB_ID: string = "Invalid labId";
    static readonly INVALID_COMPANY_TYPE_ID: string = "Invalid companyTypeId";
    static readonly INVALID_COMPANY_SUB_TYPE_ID: string = "Invalid companySubTypeId";
    static readonly INVALID_USER: string = "Invalid User";
    static readonly INVALID_ROLE_ID: string = "Invalid RoleId";
    static readonly INVALID_STATUS_ID: string = "Invalid StatusId";
    static readonly INVALID_ALERT_ID: string = "Invalid AlertId";
    static readonly INVALID_COMPANY_ID: string = "Invalid CompanyId";
    static readonly MONGOOSE_ERROR: string = "Mongoose Error";
    static readonly SERVER_RUNTIME_ERROR: string = "Server Runtime Error";
    static readonly TERMINATE_SERVER_PROCESS: string = "Terminating Server Process";
    static readonly FINGERPRINT_IS_REQUIRED: string = "FingerPrint is required";
    static readonly BADGED_ID_IS_REQUIRED: string = "badgeId is required";
    static readonly INVALID_TOKEN: string = "Invalid Token"
    static readonly INVALID_FINGERPRINT: string = "Invalid fingerPrint"
    static readonly DEVICE_NOT_REGISTERED: string = "device not registered"
    static readonly DIAMOND_MATCH_NOT_REGISTERED: string = "diamondMatch not registered"
    static readonly DIAMOND_MATCH_IS_NOT_THERE: string = "diamond Match is not there"
    static readonly EMAIL_ID: string = "Email Id Required";
    static readonly PASSWORD: string = "Password should contain at least 1 capital, 1 small, 1 number and 1 symbol";
    static readonly OLD_PASSWORD: string = "Old Password should contain at least 1 capital, 1 small, 1 number and 1 symbol";
    static readonly NEW_PASSWORD: string = "New Password should contain at least 1 capital, 1 small, 1 number and 1 symbol";
    static readonly OTP: string = "Otp Required";
    static readonly INVALID_TRANSACTION_ID: string = "Invalid TransactionId";
    static readonly INVALID_EMAIL_ID: string = "Invalid Email Id";
    static readonly FIRSTNAME_ERROR: string = "First Name Required";
    static readonly LASTNAME_ERROR: string = "Last Name Required";
    static readonly AMOUNT_ERROR: string = "Amount Required";
    static readonly NO_ACTION: string = "there are no action for all inventories";

}
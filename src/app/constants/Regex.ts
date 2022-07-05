export class Regex {
    //Regex's
    static readonly passwordRegex: any = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/ /// /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z-\d]{2,}$/
    static readonly emailRegex: any = /^[a-zA-Z]{1,}([.])?[a-zA-Z0-9]{1,}([!@#$%&_-]{1})?[a-zA-Z0-9]{1,}[@]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,3}([.]{1}[a-zA-Z]{2})?$/
    static readonly mongoObjectId:any = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
    static readonly phoneNumber:any = ''  //Todo add valid regex here
}
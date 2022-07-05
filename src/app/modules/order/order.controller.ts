// import UserBusiness from "./user.business";
// import {BaseController} from "../BaseController";
import {JsonResponse, TryCatch} from "../../helper";
import {Messages} from "../../constants"
// import {UserValidation} from "./user.validation"
import {guard} from "../../helper/Auth";
// import {IUser} from "./user.types";
// import {UserRepository} from "./user.repository";
import {MongooseTransaction} from "../../helper/MongooseTransactions";
import {RequestWithTransaction} from "../../interfaces/Request";
import {Application, Request, Response, Router} from 'express'
import { OrderRepository } from "./order.repository";
// import { UserValidation } from "./user.validation";


// import deviceModel from "../device/device.model";
// import {devices} from "../../socket"
// import { ErrorCodes } from "../../constants/ErrorCodes";

/*import faker from "faker";*/


export class OrderController {
    protected router: Router
    
    constructor() {
        this.router = Router();
        this.init();
    }

    register(express: Application) { 
        // console.log(this.router);

        express.use('/api/v1/order', guard, this.router) 
    }

    init() {
        const transaction: MongooseTransaction = new MongooseTransaction();
        // const validation: UserValidation = new UserValidation();
        this.router.get("/index", TryCatch.tryCatchGlobe(this.index));
        this.router.post("/", transaction.startTransaction, TryCatch.tryCatchGlobe(this.create));
        this.router.put("/", transaction.startTransaction, TryCatch.tryCatchGlobe(this.update));
        this.router.get("/get-by-id", TryCatch.tryCatchGlobe(this.findById));
    }

    async index(req: Request, res: Response): Promise<void> {        
        res.locals = {status: false, message: Messages.FETCH_FAILED};
        const {data, page}: any = await new OrderRepository().index(req.query as any)
        res.locals = {status: true, page, data, message: Messages.FETCH_SUCCESSFUL};
        await JsonResponse.jsonSuccess(req, res, `{this.url}.index`);
    }

    async findById(req: Request, res: Response): Promise<void> {
        res.locals = {status: false, message: Messages.CREATE_FAILED}
        let {query, query: {_id: id}} = req as any
        const data = await new OrderRepository().findById(id)
        res.locals = {status: false, message: Messages.CREATE_SUCCESSFUL, data}
        await JsonResponse.jsonSuccess(req, res, `findById`);
    }

    async create(req: Request, res: Response){        
        res.locals = {status: false, message: Messages.CREATE_FAILED}
        let {body, mongoSession} = req as RequestWithTransaction
        // body.createdBy = body.updatedBy = body.address.createdBy = body.address.updatedBy = loggedInUserId
        const data = await new OrderRepository().create(body, mongoSession)
        res.locals = {status: true, message: Messages.CREATE_SUCCESSFUL, data}
        await JsonResponse.jsonSuccess(req, res, `create`);
    }

    async update(req: Request, res: Response){
        res.locals = {status: false, message: Messages.UPDATE_FAILED}
        let {body, mongoSession, body:{loggedInUser:{_id:loggedInUserId, companyId}}} = req as RequestWithTransaction
        body.updatedBy = body.address.updatedBy = loggedInUserId
        const data = await new OrderRepository().update(body, mongoSession)
        res.locals = {status: true, message: Messages.UPDATE_SUCCESSFUL, data}
        await JsonResponse.jsonSuccess(req, res, `update`);
    }


    /**
     * Admin Registration api.
     * @param req {email, password}
     * @param res {success or fails message}
     */
    // async registration(req: Request, res: Response) {
    //     // const schema = Joi.object().keys({
    //     //     email: Joi.string().required().email({minDomainAtoms: 2}).regex(/^[a-zA-Z]{1,}([.])?[a-zA-Z0-9]{1,}([!@#$%&_-]{1})?[a-zA-Z0-9]{1,}[@]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,3}([.]{1}[a-zA-Z]{2})?$/),
    //     //     password: Joi.string().max(250).required().regex(Regex.passwordRegex).error(new Error(Errors.PASSWORD)),
    //     // });
    //     // const newData: any = req.body;
    //     // try {
    //     //     Joi.validate(newData, schema, async (err: any, value: String) => {
    //     //         if (err) { res.status(400).json({status: 400, success: false, message: err.message[0].message}) }
    //     //         else {
    //     //             let datax: any = await new adminModel(newData).save().catch((err) => {   //user saved in database
    //     //                 return res.status(400).json({status: 400, success: false, message: err.errmsg})
    //     //             });
    //     //             res.status(200).json({
    //     //                 status: 200, success: true, message: "Registration Successful. Please login.",
    //     //             })
    //     //         }
    //     //     })
    //     // } catch (err) {
    //     //     res.status(400).json({status: 400, success: false, message: err.message,})
    //     // }
    // };

    // async email(req: Request, res: Response) {
    //     let lead_mail_body: any = `<table border=1 id="table"><tr><th> Name. </th><th> Email. </th></tr>`;
    //     lead_mail_body += `<tr><td>'test mail'</td><td>tata namak swad</td></tr>`;
    //     lead_mail_body += `</table>`;
    //     const x = await new BaseHelper().emailSend('test_mail',{LEAD_BODY: lead_mail_body, NAME: 'Nilesh'}, 'ghalibansari1994@gmail.com', 'j.venkatesh@spacecode.com','',[{path: '../../../public/INFINITY.zip', filename: 'INFINITY.zip'}])
    //     // const x = await new BaseHelper().emailSend('test',lead_mail_body, 'ghalibansari1994@gmail.com','','', [{path: '../../../public/INFINITY.zip', filename: 'INFINITY.zip'}])
    //     res.locals.data = x;
    //     res.locals.message = "email send";
    //     await JsonResponse.jsonSuccess(req, res, "email");
    // }

   /* async generateFaker(req: Request, res: Response): Promise<void> {
        let {body:{loggedInUser:{_id:loggedInUserId}}, query:{numberOfRecordToBeGenerated}} = req
        let NumberOfRecordToBeGenerated = numberOfRecordToBeGenerated || Constant.NumberOfRecordsToGenerate;
        let addresses = []
        let users = []
        for(let i = 0; i<NumberOfRecordToBeGenerated; i++){
            addresses.push({
                address1: faker.address.streetName(),
                address2: faker.address.streetAddress(),
                city: faker.address.city(),
                state: faker.address.state(),
                country: faker.address.country(),
                zipCode: parseInt(faker.address.zipCode()),
                attributes: [{key: "keyExample", value: "valueExample"}],
                createdBy: loggedInUserId,
                updatedBy: loggedInUserId
            })
        }
        //@ts-expect-error
        let addressData = await new AddressBusiness().createBB(addresses)
        let addressIds: any[] = []
        let companyIds: any[] = []
        //@ts-expect-error
        addressData.forEach(address => addressIds.push(address._id))
        let dataToBeInsert: any = []
        for(let i = 0; i<NumberOfRecordToBeGenerated; i++){
            dataToBeInsert.push({
                name: faker.company.companyName(),
                addressId: addressIds[i],
                contacts: [{
                    // countryCode: faker.address.countryCode(),
                    number: faker.random.number(),
                    altNumber: faker.random.number(),
                    name: faker.name.findName(),
                    email: faker.internet.email(),
                    jobDescription: faker.name.jobDescriptor(),
                    createdBy: loggedInUserId,
                    updatedBy: loggedInUserId
                }],
                logoUrl: faker.internet.url(),
                companyTypeId: "5ed8dd91865b7535d8eeb615",
                companySubTypeId: "5efb6ed18f0011332c465025",
                parentId: "5efb57ae4d321b4674c03d10",
                attributes: [{key: "keyExample", value: "valueExample"}],
                createdBy: loggedInUserId,
                updatedBy: loggedInUserId,
            })
        }
        let companyData = await new CompanyBusiness().createBB(dataToBeInsert)
        //@ts-expect-error
        companyData.forEach(company => companyIds.push(company._id))
        for(let i = 0; i<NumberOfRecordToBeGenerated; i++){
            users.push({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                altEmail: faker.internet.email(),
                password: 'a1234567',
                phone: faker.random.number(),
                addressId: addressIds[i],
                salt: faker.random.uuid(),
                roleId: '5f230b5bab0fc51d98561037',
                companyId: companyIds[i],
                createdBy: loggedInUserId,
                updatedBy: loggedInUserId
            })
        }
        //@ts-expect-error
        res.locals.data = await new UserBusiness().createBB(users)
        res.locals.message = Messages.CREATE_SUCCESSFUL
        await JsonResponse.jsonSuccess(req, res, `{this.url}.faker`);
    }*/

    // async filter(req: Request, res: Response): Promise<void> {
    //     res.locals = {status: false, message: Messages.FETCH_FAILED}   
    //     let {body: {loggedInUser:{_id: loggedInUserId}}} = req
    //     let data = await new UserRepository().filter(loggedInUserId)
    //     res.locals = {status: true, message: Messages.FETCH_SUCCESSFUL, data}
    //     await JsonResponse.jsonSuccess(req, res, `{this.url}.filter`);
    // }

    // async exportReport(req: Request, res: Response): Promise<void> {
    //     let workbook = new Excel.Workbook();
    //     let { data, page }: any = await new UserRepository().index(req.query as any)
    //     // console.log("---------------DB-----",data);

    //     let headerData = [{ name: "First Name", filterButton: true }, { name: "Last Name", filterButton: true }, { name: "Email", filterButton: true }, { name: "Contatct Number", filterButton: true }, { name: "Company", filterButton: true }, { name: "Alternate Email", filterButton: true }, { name: "Role Description", filterButton: true }, { name: "Salt", filterButton: true }, { name: "Address1", filterButton: true }, { name: "Address2", filterButton: true }, { name: "City", filterButton: true }
    //         , { name: "State", filterButton: true }, { name: "Country", filterButton: true }, { name: "Zip Code", filterButton: true }]

    //     let requiredData = [];
    //     let arr: any[] = []
    //     // requiredData.push(arr);
    //     for (let i = 0; i < data.length; i++) {

    //         arr = [data[i].firstName, data[i].lastName, data[i].email, data[i].phone, data[i].companyId?.name, data[i].altEmail, data[i].roleId?.shortDescription, data[i].salt, data[i].addressId?.address1, data[i].addressId?.address2, data[i].addressId?.city, data[i].addressId?.state,
    //         data[i].addressId?.country, data[i].addressId?.zipCode];
    //         requiredData.push(arr);
    //     }

    //     let worksheet = workbook.addWorksheet('User Export')
    //     await new UserBusiness().exportExcel(worksheet, headerData, requiredData)
    //     let fileName = 'UserExport.xlsx'
    //     await workbook.xlsx.writeFile(path.join(__dirname, `${fileName}`))
    //     res.download(path.join(__dirname, `${fileName}`), (err) => {
    //         if (err) {
    //             if (err) { res.status(400).json({ status: 400, success: false, message: err }) }
    //             console.log("DownloadError", err);
    //         }
    //     })
    // }

    // async updateFingerPrint(req: Request, res: Response): Promise<void> {
    //     res.locals = {status: false, message: Messages.UPDATE_FAILED}   
    //     let {body, body: { _id, loggedInUser:{_id: loggedInUserId, companyId}}} = req
    //     body.updatedBy = loggedInUserId
    //     let data = await new UserRepository().findAndUpdateBR({_id}, body)
    //     let registerDevice = await deviceModel.find({companyId, isDeleted: false});
    //     for (const device of registerDevice) {
    //         let token = device?.token;
    //         if(devices[token]) devices[token].emit("refresh", ErrorCodes.REFRESH_USER);    
    //     }
    //     if(data) res.locals = {status: true, message: Messages.UPDATE_SUCCESSFUL, data: 1}
    //     else res.locals = {status: false, message: Messages.UPDATE_FAILED, data: 0}
    //     await JsonResponse.jsonSuccess(req, res, `{this.url}.updateFingerPrint`);
    // }
}
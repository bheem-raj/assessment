import {JsonResponse, TryCatch} from "../../helper";
import {Messages} from "../../constants"
import {guard} from "../../helper/Auth";
import {UserRepository} from "./user.repository";
import {MongooseTransaction} from "../../helper/MongooseTransactions";
import {RequestWithTransaction} from "../../interfaces/Request";
import {Application, Request, Response, Router} from 'express'
import { UserValidation } from "./user.validation";


export class UserController <IUser> {
    protected router: Router
    
    constructor() {
        this.router = Router();
        this.init();
    }

    register(express: Application) { 
        express.use('/api/v1/user', guard, this.router) 
    }

    init() {
        const transaction: MongooseTransaction = new MongooseTransaction();
        const validation: UserValidation = new UserValidation();
        this.router.get("/index", TryCatch.tryCatchGlobe(this.index));
        this.router.post("/", validation.createUser, transaction.startTransaction, TryCatch.tryCatchGlobe(this.create));
        this.router.put("/", validation.updateUser, transaction.startTransaction, TryCatch.tryCatchGlobe(this.update));
        this.router.get("/get-by-id", TryCatch.tryCatchGlobe(this.findById));
    }

    async index(req: Request, res: Response): Promise<void> {        
        res.locals = {status: false, message: Messages.FETCH_FAILED};
        const {data, page}: any = await new UserRepository().index(req.query as any)
        res.locals = {status: true, page, data, message: Messages.FETCH_SUCCESSFUL};
        await JsonResponse.jsonSuccess(req, res, `{this.url}.index`);
    }

    async findById(req: Request, res: Response): Promise<void> {
        res.locals = {status: false, message: Messages.CREATE_FAILED}
        let {query, query: {_id: id}} = req as any
        const data = await new UserRepository().findById(id)
        res.locals = {status: false, message: Messages.CREATE_SUCCESSFUL, data}
        await JsonResponse.jsonSuccess(req, res, `findById`);
    }

    async create(req: Request, res: Response){        
        res.locals = {status: false, message: Messages.CREATE_FAILED}
        let {body, mongoSession, body:{loggedInUser:{_id:loggedInUserId}}} = req as RequestWithTransaction
        body.createdBy = body.updatedBy = body.address.createdBy = body.address.updatedBy = loggedInUserId
        const data = await new UserRepository().create(body, mongoSession)
        res.locals = {status: true, message: Messages.CREATE_SUCCESSFUL, data}
        await JsonResponse.jsonSuccess(req, res, `create`);
    }

    async update(req: Request, res: Response){
        res.locals = {status: false, message: Messages.UPDATE_FAILED}
        let {body, mongoSession, body:{loggedInUser:{_id:loggedInUserId, companyId}}} = req as RequestWithTransaction
        body.updatedBy = body.address.updatedBy = loggedInUserId
        const data = await new UserRepository().update(body, mongoSession)
        res.locals = {status: true, message: Messages.UPDATE_SUCCESSFUL, data}
        await JsonResponse.jsonSuccess(req, res, `update`);
    }
}
// import UserBusiness from "./user.business";
// import {BaseController} from "../BaseController";
import {JsonResponse, TryCatch} from "../../helper";
import {Messages} from "../../constants"
import {guard} from "../../helper/Auth";
import {MongooseTransaction} from "../../helper/MongooseTransactions";
import {RequestWithTransaction} from "../../interfaces/Request";
import {Application, Request, Response, Router} from 'express'
import { CategoryRepository } from "./category.repository";

export class CategoryController {
    protected router: Router
    
    constructor() {
        this.router = Router();
        this.init();
    }

    register(express: Application) { 
        express.use('/api/v1/category', guard, this.router) 
    }

    init() {
        // const validation: UserValidation = new UserValidation();
        this.router.get("/index", TryCatch.tryCatchGlobe(this.index));
        this.router.post("/",  TryCatch.tryCatchGlobe(this.create));
        this.router.put("/",  TryCatch.tryCatchGlobe(this.update));
        this.router.get("/get-by-id", TryCatch.tryCatchGlobe(this.findById));
    }

    async index(req: Request, res: Response): Promise<void> {        
        res.locals = {status: false, message: Messages.FETCH_FAILED};
        const {data, page}: any = await new CategoryRepository().index(req.query as any)
        res.locals = {status: true, page, data, message: Messages.FETCH_SUCCESSFUL};
        await JsonResponse.jsonSuccess(req, res, `{this.url}.index`);
    }

    async findById(req: Request, res: Response): Promise<void> {
        res.locals = {status: false, message: Messages.CREATE_FAILED}
        let {query, query: {_id: id}} = req as any
        const data = await new CategoryRepository().findById(id)
        res.locals = {status: false, message: Messages.CREATE_SUCCESSFUL, data}
        await JsonResponse.jsonSuccess(req, res, `findById`);
    }

    async create(req: Request, res: Response){        
        res.locals = {status: false, message: Messages.CREATE_FAILED}
        let {body, mongoSession, body:{loggedInUser:{_id:loggedInUserId}}} = req as any
        body.createdBy = body.updatedBy = loggedInUserId
        const data = await new CategoryRepository().create(body)
        res.locals = {status: true, message: Messages.CREATE_SUCCESSFUL, data}
        await JsonResponse.jsonSuccess(req, res, `create`);
    }

    async update(req: Request, res: Response){
        res.locals = {status: false, message: Messages.UPDATE_FAILED}
        let {body, mongoSession, body:{loggedInUser:{_id:loggedInUserId, companyId}}} = req as any
        body.updatedBy = body.address.updatedBy = loggedInUserId
        const data = await new CategoryRepository().update(body)
        res.locals = {status: true, message: Messages.UPDATE_SUCCESSFUL, data}
        await JsonResponse.jsonSuccess(req, res, `update`);
    }
}
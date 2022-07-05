import { Request, Response } from "express";
import * as HttpStatus from 'http-status-codes';
import {ISuccessResponse} from "./IApiResponse";
import { MongooseTransaction } from "./MongooseTransactions";

export class JsonResponse {
    /**
     * jsonSuccess
     */
    static async jsonSuccess(req: Request, res: Response, method_name?: string): Promise<void> {
        //@ts-expect-error
        await new MongooseTransaction().commitTransaction(req, res)

        // let {locals: {status, message, page, data}} = res
        const obj: ISuccessResponse = {
            status: res.locals.status || true,  //Todo make default false...
            message: res.locals.message,
            errorCode: res.locals.errorCode,
            page: res.locals.page,
            header: res.locals.header,
            data: res.locals.data ?? null
        };
        res.status(HttpStatus.OK).send(obj)     //Todo add constraint here before sending in typescript
    }

    /**
     * jsonError
     */
    static async jsonError(req: Request, res: Response, method_name?: string): Promise<void> {
        //@ts-expect-error
        await new MongooseTransaction().abortTransaction(req, res)

        const obj: ISuccessResponse = {
            status: false,
            message: res.locals.message || "Something went wrong, please contact to admin.",
            data: res.locals.data ?? null
        };

        if (!res.locals.code) res.status(HttpStatus.OK)
        else res.status(res.locals.code)
        res.send(obj)    //Todo add constraint here before sending in typescript
        // if (!res.locals.status_code) {res.status(HttpStatus.BAD_REQUEST)}
        // else {res.status(res.locals.status_code)}
        // res.send(obj);
    }
}
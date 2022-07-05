import {Request, Response} from "express";
import {JsonResponse} from "./JsonResponse";
import {memoryStorage} from "multer";
import {MongooseTransaction} from "./MongooseTransactions";
// import loggerModel from "../modules/loggers/logger.model";
// import {modulesEnum} from "../constants";
// import {loggerLevelEnum} from "../modules/loggers/logger.types";

export class TryCatch{
    /**
     * tryCatchGlobe
     */
    static tryCatchGlobe(handler:Function)  {
        return async (req: Request, res: Response, next:Function) => {
            try {await handler(req,res)}
            catch (err: any) {
                const {body, originalUrl, method, query} = req
                // const createdBy = loggedInUserId, updatedBy = loggedInUserId
                // delete body.loggedInUser
                const [,,,module,] = originalUrl.split('/')
                // loggerModel.create({body: JSON.stringify(body||''), url: originalUrl, method, query: JSON.stringify(query), message: err.stack, createdBy, updatedBy, level: loggerLevelEnum.api, module})
                //     .catch((err:any) => console.log('Logging Failed', err))
                // logger.error({loggedInUserId, originalUrl, method, query, error: err, body})
                console.log(err);
                
                res.locals.message = err?.message ?? err;
                if(body.event_id) res.locals.data = {event_id : body.event_id}
                await JsonResponse.jsonError(req, res);
            }
        }
    }
}

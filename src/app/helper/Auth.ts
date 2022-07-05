import {NextFunction, Request, Response} from "express"
import CryptoJS, {AES, DecryptedMessage} from "crypto-js";
import jwt from "jsonwebtoken";
import {Constant, Messages, Texts} from "../constants";
import {JsonResponse} from "./JsonResponse";


/**
 * guard function stops unAuthorize user from access.
 * @param req   {jwt_encrypted_token,   data}
 * @param res
 * @param next
 */
async function guard(req: Request, res: Response, next: NextFunction) {
    try {
        let jwt_token_header: any = req.headers.authorization;   //get encrypted token_header from front_end.
        let jwt_token_decrypt: DecryptedMessage = AES.decrypt(jwt_token_header, Constant.secret_key);  //decrypt token_header.
        let jwt_token: string = jwt_token_decrypt.toString(CryptoJS.enc.Utf8);  //covert to string.
        req.body.loggedInUser = jwt.verify(jwt_token, Constant.jwt_key);   //verify jwt.

        if(req?.body?.loggedInUser?.roleName !== Texts.SUPERADMIN){
            if(req?.query?.filters){
                //@ts-expect-error
                let filters: {}[] = JSON.parse(req.query.filters);
                filters = [...filters, {key: Texts.companyId, value: req?.body?.loggedInUser.companyId}]
                req.query.filters = JSON.stringify(filters);
            }
            else {
                const filters = [{key: Texts.companyId, value: req?.body?.loggedInUser.companyId}]
                req.query.filters = JSON.stringify(filters);
            }
        }
        next()  
    } catch (err) {
        res.locals.status = false;
        res.locals.data = {isValid: false, authorizationFailed: true};
        res.locals.message = 'Login please.' //|| auth.message;
        await JsonResponse.jsonError(req, res, 'guard');
    }
}

export {guard};
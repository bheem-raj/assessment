import {Errors, Messages, Regex} from "../../constants";
import Joi from "@hapi/joi"
import {NextFunction, Request, Response} from "express";
import {JsonResponse} from "../../helper";
// import {createAddressSchemaObject, updateAddressSchemaObject} from "../address/address.validation";
// import {IUser} from "./user.types";


const createCategorySchemaObject = {
    // firstName: Joi.string().max(250).required().error(new Error(Errors.FIRSTNAME_ERROR)),
    // lastName: Joi.string().max(250).required().error(new Error(Errors.LASTNAME_ERROR)),
    // email: Joi.string().email().regex(Regex.emailRegex).required().error(new Error(Errors.INVALID_EMAIL_ID)),
    // altEmail: Joi.string().email().regex(Regex.emailRegex).required().error(new Error(Errors.INVALID_EMAIL_ID)),
    // password: Joi.string().max(250).regex(Regex.passwordRegex).error(new Error(Errors.PASSWORD)),
    // phone: Joi.string().required(),
    // roleId: Joi.string().regex(Regex.mongoObjectId).required().error(new Error(Errors.INVALID_ROLE_ID)),
    // address: Joi.object(createAddressSchemaObject).required(),
    // fingerPrint: Joi.string(),
    loggedInUser: Joi.any(),
};

export const updateCategorySchemaObject = {
    // _id: Joi.string().regex(Regex.mongoObjectId).required().error(new Error(Errors.INVALID_ID)),
    // firstName: Joi.string().max(250).required().error(new Error(Errors.FIRSTNAME_ERROR)),
    // lastName: Joi.string().max(250).required().error(new Error(Errors.LASTNAME_ERROR)),
    // email: Joi.string().email().regex(Regex.emailRegex).required().error(new Error(Errors.INVALID_EMAIL_ID)),
    // altEmail: Joi.string().email().regex(Regex.emailRegex).required().error(new Error(Errors.INVALID_EMAIL_ID)),
    // password: Joi.string().max(250).regex(Regex.passwordRegex).error(new Error(Errors.PASSWORD)),
    // phone: Joi.string().required(),
    // address: Joi.object(createAddressSchemaObject).required(),
    // roleId: Joi.string().regex(Regex.mongoObjectId).required().error(new Error(Errors.INVALID_ROLE_ID)),
    loggedInUser: Joi.any(),
}


export  class OrderValidation {
    async createCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        // const Schema = Joi.object<ICategory>(createCategorySchemaObject)
        // await Schema.validateAsync(req.body, {abortEarly: false}).then(() => next())
            // .catch(async (err: Error) => {res.locals.message = err.message; await JsonResponse.jsonError(req, res)})
    }

    async updateCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        // const Schema = Joi.object<ICategory>(updateCategorySchemaObject);
        // await Schema.validateAsync(req.body, {abortEarly: false}).then(() => next())
        //     .catch(async (err: Error) => {res.locals.message = err.message; await JsonResponse.jsonError(req, res)})
    }
}

import {Errors, Messages, Regex} from "../../constants";
import Joi from "@hapi/joi"
import {NextFunction, Request, Response} from "express";
import {JsonResponse} from "../../helper";
import { ICategory } from "./category.types";
// import {createAddressSchemaObject, updateAddressSchemaObject} from "../address/address.validation";
// import {IUser} from "./user.types";


const createCategorySchemaObject = {
    category: Joi.string().required(),
    loggedInUser: Joi.any(),
};

export const updateCategorySchemaObject = {
    _id: Joi.string().regex(Regex.mongoObjectId).required().error(new Error(Errors.INVALID_ID)),
    category: Joi.string(),
    loggedInUser: Joi.any(),
}


export  class CategoryValidation {
    async createCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        const Schema = Joi.object<ICategory>(createCategorySchemaObject)
        await Schema.validateAsync(req.body, {abortEarly: false}).then(() => next())
            .catch(async (err: Error) => {res.locals.message = err.message; await JsonResponse.jsonError(req, res)})
    }

    async updateCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        const Schema = Joi.object<ICategory>(updateCategorySchemaObject);
        await Schema.validateAsync(req.body, {abortEarly: false}).then(() => next())
            .catch(async (err: Error) => {res.locals.message = err.message; await JsonResponse.jsonError(req, res)})
    }
}

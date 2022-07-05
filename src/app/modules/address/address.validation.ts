import {Errors, Messages, Regex} from "../../constants";
import Joi from "@hapi/joi";
import {NextFunction, Request, Response} from "express";
import {JsonResponse} from "../../helper";
import {IAddress} from "./address.types";


export const createAddressSchemaObject = {
    address1: Joi.string().min(5).max(250).required(),
    address2: Joi.string().min(5).max(250).required(),
    city: Joi.string().min(3).max(50).required(),
    state: Joi.string().min(3).max(50).required(),
    zipCode: Joi.string().required(),   //Todo add max limit
    country: Joi.string().min(3).max(50).required(),
    loggedInUser: Joi.any(),
};

export const updateAddressSchemaObject = {
    _id: Joi.string().regex(Regex.mongoObjectId).required().error(new Error(Errors.INVALID_ID)),
    address1: Joi.string().min(5).max(250).required(),
    address2: Joi.string().min(5).max(250).required(),
    city: Joi.string().min(3).max(50).required(),
    state: Joi.string().min(3).max(50).required(),
    zipCode: Joi.string().required(),
    country: Joi.string().min(3).max(50).required(),
    loggedInUser: Joi.any()
}

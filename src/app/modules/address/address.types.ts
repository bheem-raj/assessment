import {Document} from "mongoose";
import {IUser} from "../user/user.types";

export interface IAddress extends Document {
    _id: string;
    address1: string,
    address2: string,
    city: string,
    state: string,
    country: string
    zipCode: Number
    createdBy:IUser['_id'];
    updatedBy:IUser['_id'];
    createdAt:Date;
    updatedAt:Date;
}
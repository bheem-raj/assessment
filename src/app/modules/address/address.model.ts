import {model, Schema} from "mongoose";
import {IAddress} from "./address.types";
import {TableName} from "../../constants";

const {Types: {ObjectId, String, Boolean, Number}} = Schema


const addressSchema: Schema<IAddress> = new Schema({
    address1: {type: String, required: true},
    address2: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    country: {type: String, required: true},
    zipCode: {type: String, required: true},
    isDeleted: {type: Boolean, default: 0},
    createdBy: {type: ObjectId, ref: TableName.USER, required: true},
    updatedBy: {type: ObjectId, ref: TableName.USER, required: true},
   //
}, {timestamps: true, versionKey: false});

const addressModel = model<IAddress>(TableName.ADDRESS, addressSchema);

export default addressModel;
export {addressSchema}
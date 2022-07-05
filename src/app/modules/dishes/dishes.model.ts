import {model, Schema, Document} from "mongoose";
import {TableName} from "../../constants";
import { IDishes } from "./dishes.types";
const {Types: {ObjectId, String, Boolean}} = Schema


//user schema.
const dishSchema = new Schema<IDishes>({
    photo: {type: String},
    name: {type: String, required: true},
    portionSize: {type: Number, required: true, default: 1},
    price: {type: Number, required: true},
    categoryId: {type: ObjectId, ref: TableName.CATEGORY},
    isActive: {type: Boolean, default: 1},
    isDeleted: {type: Boolean, default: 0},
    createdBy: {type: ObjectId, ref: TableName.USER},
    updatedBy: {type: ObjectId, ref: TableName.USER},
}, {timestamps: true, versionKey: false});


const dishesModel = model<IDishes>(TableName.DISH, dishSchema);

export default dishesModel
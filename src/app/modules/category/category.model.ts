import {model, Schema, Document} from "mongoose";
import {TableName} from "../../constants";
import { ICategory } from "./category.types";
const {Types: {ObjectId, String, Boolean}} = Schema


const categorySchema = new Schema<ICategory>({    
    category: {type: String, required: true},
    isActive: {type: Boolean, default: 1},
    isDeleted: {type: Boolean, default: 0},
    createdBy: {type: ObjectId, ref: TableName.USER},
    updatedBy: {type: ObjectId, ref: TableName.USER},
}, {timestamps: true, versionKey: false});


const categoryModel = model<ICategory>(TableName.CATEGORY, categorySchema);

export default categoryModel
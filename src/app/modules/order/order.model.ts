import {model, Schema, Document} from "mongoose";
import {TableName} from "../../constants";
import { IOrder } from "./order.types";
const {Types: {ObjectId, String, Boolean}} = Schema


const orderSchema = new Schema<IOrder>({    
    orderId: {type: String, required: true},
    ordererItems: [{
        menuId: {type: ObjectId, ref: TableName.DISH, required: true},
        quantity: {type: Number, required: true},
    }],
    orderedAt: {type: Date, required: true},
    isActive: {type: Boolean, default: 1},
    isDeleted: {type: Boolean, default: 0},
    createdBy: {type: ObjectId, ref: TableName.USER},
    updatedBy: {type: ObjectId, ref: TableName.USER},
}, {timestamps: true, versionKey: false});


const orderModel = model<IOrder>(TableName.CATEGORY, orderSchema);

export default orderModel
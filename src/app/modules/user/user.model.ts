import {model, Schema, Document} from "mongoose";
import {IUser} from './user.types'
import {TableName} from "../../constants";
// import { fingerPrintSchema } from "../fingerPrint/fingerPrint.model";
import bcrypt, {genSaltSync, hashSync} from "bcrypt";
const {Types: {ObjectId, String, Boolean}} = Schema


//user schema.
const userSchema = new Schema<IUser>({    //Todo hide password globally thought out the system...
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    altEmail: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {type: String, required: true, unique: true},
    addressId: {type: ObjectId, ref: TableName.ADDRESS, required: true},
    isActive: {type: Boolean, default: 1},
    isDeleted: {type: Boolean, default: 0},
    createdBy: {type: ObjectId, ref: TableName.USER},
    updatedBy: {type: ObjectId, ref: TableName.USER},
}, {timestamps: true, versionKey: false});

userSchema.pre('save', function async (next) {
    this.password = hashSync(this.password, genSaltSync(8))
    next()
})

// userSchema.pre('insertMany', function async (next) {
//     //@ts-expect-error
//     if(this.password) this.password = hashSync(this.password, genSaltSync(10))
//     next(()=>{})
// })

userSchema.pre('updateOne', function async (next) {
    //@ts-expect-error
    if(this._update.password) this._update.password = hashSync(this._update.password, genSaltSync(8))
    // @ts-ignore
    next()
})

const userModel = model<IUser>(TableName.USER, userSchema);

export default userModel
import {Document, ObjectId} from "mongoose";
import { IUser } from "../user/user.types";

export interface ICategory extends Document {
    _id: ObjectId;    //Todo convert all _id string types to ObjectId types...
    category: string;
    isActive: boolean;
    isDeleted: boolean;
    createdBy: IUser['_id'];
    updatedBy: IUser['_id'];
    createdAt: Date;
    updatedAt: Date;
}

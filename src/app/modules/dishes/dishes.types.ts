import {Document, ObjectId} from "mongoose";
import { ICategory } from "../category/category.types";
import { IUser } from "../user/user.types";


export interface IDishes extends Document {
    _id: string;
    photo: string;
    name: string;
    portionSize: number;
    price: string;
    categoryId: ICategory['_id'];
    isActive: boolean;
    isDeleted: boolean;
    createdBy: IUser['_id'];
    updatedBy: IUser['_id'];
    createdAt: Date;
    updatedAt: Date;
}
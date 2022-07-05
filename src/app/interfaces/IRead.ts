import {Document} from "mongoose";

export interface IRead<T> {
    findBR: ()=> Promise<T[]>;
    findByIdBR: (id: string)=> Promise<T|null>
    findIdByIdBR: (id: string)=> Promise<T|null>
    findPopulateBR: (cond: object, populate: object[])=> Promise<T[]>
}

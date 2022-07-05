import {BaseRepository} from "../BaseRepository";
// import userModel from "./user.model";
// import {IUser, IUserNested} from "./user.types";
import mongoose, {ClientSession} from 'mongoose'
// import addressModel from "../address/address.model";
// import {Errors, Messages, Texts} from "../../constants";
// import roleModel from "../role/role.model";
// import companyModel from "../company/company.model";
import {ICond, IIndexFilters, IIndexParam, IIndexProjection} from "../../interfaces/IRepository";
import { IDishes } from "./dishes.types";
import dishesModel from "./dishes.model";
// import verificationModel from "../verification/verification.model";


export class DishesRepository extends BaseRepository<IDishes> {
    constructor () {
        super(dishesModel);
    }

    index = async ({filters, search, sort:sorter, pageNumber, pageSize, column}: IIndexParam): Promise<any> => {
        //@ts-expect-error
        let cond: ICond = {'isDeleted': false}, sort = {}, projection: IIndexProjection = {password: 0}
        let secondCond: any = { //Todo add isDeleted condition here in every table
            // 'companyId.isDeleted': false,
            // 'rfId.isDeleted': false,
        };

        if(sorter?.length && sorter[0] === '{' && sorter[sorter.length-1] === '}') {
            sorter = sorter.replace(/'/g, '"')
            //const {key, value} = await JSON.parse(sorter)
            let {key: k, value: v} = await JSON.parse(sorter)
            sort = {[k] : v}
        }
        else sort = { createdAt: -1, updatedAt: -1};

        if(search){
            search = JSON.parse(search)
            const _S = {$regex: search, $options: "i"}
            secondCond['$or'] = [
                {'firstName': _S}, {'lastName': _S}, {'email': _S}, {'altEmail': _S}, {'phone': _S}, {'contacts.name': _S}, {'addressId.address1': _S},
                {'addressId.address2': _S}, {'addressId.city': _S}, {'addressId.state': _S}, {'addressId.country': _S}, {'addressId.zipCode': _S},
            ]
        }

        if(filters && filters[0]=='[' && filters[filters.length-1]==']') {
            filters = filters.replace(/'/g, '"')
            filters = JSON.parse(filters)
            // for(const {key: k, value: v} of filters) {
            //@ts-expect-error
            filters.forEach(({key: k, value: v}: IIndexFilters) => {
                if(k === 'startDate' || k === 'endDate') {
                    if(!(cond['createdAt'] instanceof Object)) cond['createdAt'] = {}
                    if(k === 'startDate') cond['createdAt']['$gte'] = new Date(v as string)
                    if(k === 'endDate') cond['createdAt']['$lte'] = new Date(v as string)
                }
                else if(k === '_id') cond[k] = mongoose.Types.ObjectId(v as string)
                else if(k.includes(".") && k[k.length-2] === 'I' && k[k.length-1] === 'd' && v instanceof Array) {v.forEach((val: any, i: number) => v[i] = mongoose.Types.ObjectId(val)); secondCond[k] = {$in: v}}
                else if(k.includes(".") && k[k.length-2] === 'I' && k[k.length-1] === 'd') secondCond[k] = mongoose.Types.ObjectId(v as string)
                else if(k[k.length-2] === 'I' && k[k.length-1] === 'd' && v instanceof Array) {v.forEach((val: any, i: number) => v[i] = mongoose.Types.ObjectId(val)); cond[k] = {$in: v}}
                else if(k[k.length-2] === 'I' && k[k.length-1] === 'd') cond[k] = mongoose.Types.ObjectId(v as string)
                else if(k.includes(".")) v instanceof Array ? secondCond[k] = {$in: v} : secondCond[k] = v
                else v instanceof Array ? cond[k] = {$in: v} : cond[k] = v
            })
        }

        if(column && column[0]=='[' && column[column.length-1]==']'){
            column = column.replace(/'/g, '"')
            column = JSON.parse(column)
            projection = {}
            for(const col of column) projection[col] = 1
        }

        let aggregate : any = [ //Todo replace all from string to model.collection.name...
            // {$lookup: {from: companyModel.collection.name, localField: 'companyId', foreignField: '_id', as: 'companyId'}},
            // {$unwind: {path: "$companyId", preserveNullAndEmptyArrays: true}},
            // {$lookup: {from: addressModel.collection.name, localField: 'addressId', foreignField: '_id', as: 'addressId'}},
            // {$unwind: {path: "$addressId", preserveNullAndEmptyArrays: true}},
            // {$lookup: {from: userModel.collection.name, localField: 'createdBy', foreignField: '_id', as: 'createdBy'}}, {$unwind: {path: "$createdBy", preserveNullAndEmptyArrays: true}},
            // {$lookup: {from: roleModel.collection.name, localField: 'roleId', foreignField: '_id', as: 'roleId'}},
            // {$unwind: {path: "$roleId", preserveNullAndEmptyArrays: true}},
            // {$lookup: {from: verificationModel.collection.name, let: {userId: '$_id'}, pipeline: [{$match: {$expr: {$eq: ['$userId', '$$userId']}, isVerified: true, isActive: false, isDeleted: false}}, {$sort: {updatedAt: -1}}, {$project: {updatedAt: 1, _id: 0}}, {$limit: 1}], as: 'verifications'}},
            // {$unwind: {path: "$verifications", preserveNullAndEmptyArrays: true}},
            // {$set: {lastLogin: '$verifications.updatedAt'}},
            // {$unset: 'verifications'}
        ]
        const sCond = [{$match: secondCond}, {$project: projection},]
        return await super.aggregateFaceTIndexBR(cond, aggregate, sCond, sort, pageNumber, pageSize)
    }

    create = async (newData: any, session: ClientSession): Promise<IDishes|never> => {
        return await dishesModel.create([newData], {session}).then(user => user[0])
    }

    findById = async (_id: string): Promise<IDishes|null> => {
        const aggregate = [
            {$match: {_id: mongoose.Types.ObjectId(_id), isDeleted: false}},
            {$lookup: {from: 'companies', localField: 'companyId', foreignField: '_id', as: 'companyId'}},
            {$unwind: {path: "$companyId", preserveNullAndEmptyArrays: true}},
            {$lookup: {from: 'addresses', localField: 'addressId', foreignField: '_id', as: 'addressId'}},
            {$unwind: {path: "$addressId", preserveNullAndEmptyArrays: true}},
            {$lookup: {from: 'roles', localField: 'roleId', foreignField: '_id', as: 'roleId'}},
            {$unwind: {path: "$roleId", preserveNullAndEmptyArrays: true}},
           // {$unset: 'password'}
        ]
        return await dishesModel.aggregate<IDishes>(aggregate).then(user => user[0] || null)
    }

    update = async (newData: any, session: ClientSession): Promise<any> => {    //Todo optimize this function using aggregate...
        // const [AddressToData] = await Promise.all([await userModel.findOne({_id: newData._id, isDeleted: false},'addressId'), await this.checkIds(newData)])
        // // @ts-ignore
        // const AddressData = await addressModel.findOne({_id: AddressToData?.addressId, isDeleted: false})
        // if(AddressToData && AddressData) {
        //     let [addressUpdate, userUpdate] = await Promise.all([
        //         await addressModel.findByIdAndUpdate(AddressToData?.addressId, newData.address).session(session),
        //         await userModel.updateOne({_id: newData._id}, newData, {new: true}).session(session)
        //     ])
        //     if(!addressUpdate || !userUpdate?.nModified) throw new Error(Messages.UPDATE_FAILED)
        //     return userUpdate?.nModified;
        // }
        // else throw new Error(Messages.UPDATE_FAILED)
    }

}
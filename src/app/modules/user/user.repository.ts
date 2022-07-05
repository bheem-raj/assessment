import {BaseRepository} from "../BaseRepository";
import userModel from "./user.model";
import {IUser, IUserNested} from "./user.types";
import mongoose, {ClientSession} from 'mongoose'
import {ICond, IIndexFilters, IIndexParam, IIndexProjection} from "../../interfaces/IRepository";
import addressModel from "../address/address.model";
import { Messages } from "../../constants";


export class UserRepository extends BaseRepository<IUser> {
    constructor () {
        super(userModel);
    }

    index = async ({filters, search, sort:sorter, pageNumber, pageSize, column}: IIndexParam): Promise<IUserNested[]> => {
        //@ts-expect-error
        let cond: ICond = {'isDeleted': false}, sort = {}, projection: IIndexProjection = {password: 0}
        let secondCond: any = { 
          
        };

        if(sorter?.length && sorter[0] === '{' && sorter[sorter.length-1] === '}') {
            sorter = sorter.replace(/'/g, '"')
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

        let aggregate : any = [ 
            {$lookup: {from: addressModel.collection.name, localField: 'addressId', foreignField: '_id', as: 'addressId'}},
            {$unwind: {path: "$addressId", preserveNullAndEmptyArrays: true}},
            {$lookup: {from: userModel.collection.name, localField: 'createdBy', foreignField: '_id', as: 'createdBy'}}, {$unwind: {path: "$createdBy", preserveNullAndEmptyArrays: true}},
            // {$lookup: {from: roleModel.collection.name, localField: 'roleId', foreignField: '_id', as: 'roleId'}},
            {$unwind: {path: "$roleId", preserveNullAndEmptyArrays: true}},
        ]
        const sCond = [{$match: secondCond}, {$project: projection},]
        return await super.aggregateFaceTIndexBR(cond, aggregate, sCond, sort, pageNumber, pageSize)
    }

    create = async (newData: any, session: ClientSession): Promise<IUser|never> => {
        const duplicate = await userModel.findOne().or([{email: newData?.email}, {altEmail: newData?.altEmail}, {phone: newData?.phone}]).select('email altEmail phone')

        if(duplicate) {
            if(duplicate.email === newData?.email) throw new Error('Email already Present')
            else if(duplicate.altEmail === newData?.altEmail) throw new Error('Alternate Email already Present')
            else if(duplicate.phone == newData?.phone) throw new Error('Phone number already Present')
        }
        await addressModel.create([newData.address], {session}).then(addressData => newData.addressId = addressData[0]._id)
        return await userModel.create([newData], {session}).then(user => user[0])
    }

    findById = async (_id: IUser['_id']): Promise<IUser|null> => {
        const aggregate = [
            {$match: {_id: mongoose.Types.ObjectId(_id), isDeleted: false}},
            {$lookup: {from: 'addresses', localField: 'addressId', foreignField: '_id', as: 'addressId'}},
            {$unwind: {path: "$addressId", preserveNullAndEmptyArrays: true}},
            {$lookup: {from: 'roles', localField: 'roleId', foreignField: '_id', as: 'roleId'}},
            {$unwind: {path: "$roleId", preserveNullAndEmptyArrays: true}},
        ]
        return await userModel.aggregate<IUser>(aggregate).then(user => user[0] || null)
    }

    update = async (newData: any, session: ClientSession): Promise<any> => {   
        const AddressToData = await userModel.findOne({_id: newData._id, isDeleted: false},'addressId')
        const AddressData = await addressModel.findOne({_id: AddressToData?.addressId, isDeleted: false})
        if(AddressToData && AddressData) {
            let [addressUpdate, userUpdate] = await Promise.all([
                await addressModel.findByIdAndUpdate(AddressToData?.addressId, newData.address).session(session),
                await userModel.updateOne({_id: newData._id}, newData, {new: true}).session(session)
            ])
            if(!addressUpdate || !userUpdate?.nModified) throw new Error(Messages.UPDATE_FAILED)
            return userUpdate?.nModified;
        }
        else throw new Error(Messages.UPDATE_FAILED)
    }


    // async filter(userId: IUser['_id']): Promise<any> {
    //     let user = await userModel.findOne({ _id: userId }).populate([{ path: 'roleId' }])
    //     let cond: any = {}        
    //     //@ts-expect-error
    //     if(user.roleId?.shortDescription != Texts.SPACECODEADMIN) cond["companyId"] = mongoose.Types.ObjectId(user.companyId as string);
    //     let data = await userModel.aggregate([
    //         { $match: { ...cond, "isDeleted": false } },
    //         { $lookup: { from: 'companies', localField: 'companyId', foreignField: '_id', as: 'companyId' } },
    //         { $unwind: { path: "$companyId", preserveNullAndEmptyArrays: true } },
    //         { $lookup: { from: 'roles', localField: 'roleId', foreignField: '_id', as: 'roleId' } },
    //         { $unwind: { path: "$roleId", preserveNullAndEmptyArrays: true } },
    //         { $lookup: { from: 'companytypes', localField: 'companyId.companyTypeId', foreignField: '_id', as: 'companyTypeId' } },
    //         { $unwind: { path: "$companyTypeId", preserveNullAndEmptyArrays: true } },
    //         { $lookup: { from: 'companysubtypes', localField: 'companyId.companySubTypeId', foreignField: '_id', as: 'companySubTypeId' } },
    //         { $unwind: { path: "$companySubTypeId", preserveNullAndEmptyArrays: true } },
    //         { $lookup: { from: 'addresses', localField: 'addressId', foreignField: '_id', as: 'addressId' } },
    //         { $unwind: { path: "$addressId", preserveNullAndEmptyArrays: true } },
    //         { $set: { "companyId.companyTypeId": "$companyTypeId" } },
    //         { $set: { "companyId.companySubTypeId": "$companySubTypeId" } },
    //         // { $set: { "companyId.addressId": "$addressId" } },
    //         { $unset: ["companyTypeId", "companySubTypeId"] },

    //         {
    //             $group: {
    //                 _id: null,
    //                 "roles": { "$addToSet": "$roleId" },
    //                 "companies": {"$addToSet": "$companyId"},
    //                 "companyTypes": { "$addToSet": "$companyId.companyTypeId" },
    //                 "companySubTypes": { "$addToSet": "$companyId.companySubTypeId" },
    //                 "city": { "$addToSet": "$addressId.city" },
    //                 "state": { "$addToSet": "$addressId.state" },
    //                 "country": { "$addToSet": "$addressId.country" }
    //             }
    //         },
    //         {
    //             $project: {
    //                 _id: 0, "roles._id": 1, "roles.shortDescription":1, "companies._id": 1, "companies.name":1,
    //                 "companyTypes._id": 1,"companyTypes.shortDescription": 1,"companySubTypes._id": 1,"companySubTypes.shortDescription": 1,
    //                 "city": 1, "state": 1, "country": 1
    //             }
    //         }
    //     ]).then(data => data[0])
    //     return data
    // }  

}
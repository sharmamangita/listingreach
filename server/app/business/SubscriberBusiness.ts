
import BaseBusiness = require("./BaseBusiness");
import SubscriberRepository = require("../repository/SubscriberRepository");
import ISubscriberModel = require("../model/interfaces/ISubscriberModel");
import mongoose =require("mongoose");
class SubscriberBusiness implements BaseBusiness<ISubscriberModel> {
    private _subscriberRepository: SubscriberRepository;

    constructor() {
        this._subscriberRepository =new SubscriberRepository();
    }
    retrieve(query: any, callback: (error: any, result: any) => void) {
        this._subscriberRepository.retrieve(query, callback);
    }
    retrieveFields(query: any, fields: any, callback: (error: any, result: any) => void) {
        this._subscriberRepository.retrieveFields(query, fields, callback);
    }
    findById: (_id: string, callback: (error: any, result: ISubscriberModel) => void) => void;
    create(item: ISubscriberModel, callback: (error: any, result: any) => void) {
        item._id=mongoose.Types.ObjectId();
        this._subscriberRepository.create(item, callback);
    };
    update: (_id: string, item: ISubscriberModel, callback: (error: any, result: any) => void) => void;
    delete: (_id: string, callback: (error: any, result: any) => void) => void;
    deleteMany: (query: any, callback: (error: any, result: any) => void) => void;


}


Object.seal(SubscriberBusiness);
export = SubscriberBusiness;

import BaseBusiness = require("./BaseBusiness");
import SubscriberRepository = require("../repository/SubscriberRepository");
import ISubscriberModel = require("../model/interfaces/ISubscriberModel");
import mongoose = require("mongoose");
class SubscriberBusiness implements BaseBusiness<ISubscriberModel> {
    private _subscriberRepository: SubscriberRepository;

    constructor() {
        this._subscriberRepository = new SubscriberRepository();
    }
    retrieve(query: any, callback: (error: any, result: any) => void) {
        this._subscriberRepository.retrieve(query, callback);
    }
    count(query: any, callback: (error: any, result: any) => void) {
        this._subscriberRepository.count(query, callback);
    }
    retrieveFields(query: any, fields: any, callback: (error: any, result: any) => void) {
        this._subscriberRepository.retrieveFields(query, fields, callback);
    }
    customaggregate(query: any, match: object, group: object, callback: (error: any, result: any) => void) {
        this._subscriberRepository.customaggregate(query, match, group, callback);
    }
    aggregate(query: any, callback: (error: any, result: any) => void) {
        this._subscriberRepository.aggregate(query, callback);
    }

    findOne(query: any, callback: (error: any, result: ISubscriberModel) => void) {
        this._subscriberRepository.findOne(query, callback);
    }
    findById(_id: string, callback: (error: any, result: ISubscriberModel) => void) {
        this._subscriberRepository.findById(_id, callback);
    }
    create(item: ISubscriberModel, callback: (error: any, result: any) => void) {
        item._id = mongoose.Types.ObjectId();
        this._subscriberRepository.create(item, callback);
    };
    update(_id: any, item: ISubscriberModel, callback: (error: any, result: any) => void) {
        this._subscriberRepository.update(item._id, item, callback);
    }
    delete(_id: string, callback: (error: any, result: any) => void) {
        this._subscriberRepository.delete(_id, callback);
    }
    deleteMany: (query: any, callback: (error: any, result: any) => void) => void;


}


Object.seal(SubscriberBusiness);
export = SubscriberBusiness;
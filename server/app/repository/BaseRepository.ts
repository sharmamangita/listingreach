/**
 * Repository pattern implementation
 */

import IRead = require("./interfaces/Read");
import IWrite = require("./interfaces/Write");
var _ = require('lodash');

import mongoose = require("mongoose");

class RepositoryBase<T extends mongoose.Document> implements IRead<T>, IWrite<T> {

    private _model: mongoose.Model<mongoose.Document>;

    constructor(schemaModel: mongoose.Model<mongoose.Document>) {
        this._model = schemaModel;
    }

    create(item: T, callback: (error: any, result: any) => void) {
        this._model.create(item, callback);

    }

    retrieve(query: any, callback: (error: any, result: any) => void) {
        this._model.find(query, callback)
    }

    customaggregate(query: any, match: object, group: object, callback: (error: any, result: any) => void) {
        this._model.aggregate(
            [
                { $match: match },
                { $group: group }
            ]
        ).cursor({}).exec().toArray(callback);
    }

    aggregate(query: any, callback: (error: any, result: any) => void) {
        this._model.aggregate(query

        ).cursor({}).exec().toArray(callback);
    }

    retrieveFields(query: any, fields: any, callback: (error: any, result: any) => void) {
        this._model.find(query).select(fields).exec(callback);
    }

    update(_id: mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void) {
        this._model.update({ _id: _id }, _.omit(item, '_id'), callback);
    }

    updateMany(query: any, item: T, multi: any, callback: (error: any, result: any) => void) {
        this._model.update(query, _.omit(item, '_id'), multi, callback);
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        this._model.remove({ _id: this.toObjectId(_id) }, (err) => callback(err, null));
    }
    deleteMany(query: any, callback: (error: any, result: any) => void) {
        this._model.schema.methods.deleteMany(query, (err: any) => callback(err, null));
    }

    findById(_id: string, callback: (error: any, result: T) => void) {
        this._model.findById(_id, callback);
    }


    private toObjectId(_id: string): mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(_id)
    }

    //added for finding 1st record for passed column name and value in the query fr example {'email':<emailval>}
    count(query: any, callback: (error: any, result: Number) => void) {
        this._model.count(query, callback);
    }

    findOne(query: any, callback: (error: any, result: T) => void) {
        this._model.findOne(query, callback);
    }

}

export = RepositoryBase;
/**
 * Business Logic for PlanBusiness, called from the Controllers
 */
import express = require("express");
import mongoose = require("mongoose");

import BaseBusiness = require("./BaseBusiness");
import PropertyRepository = require("./../repository/PropertyRepository");
import IPropertyModel = require("./../model/interfaces/IPropertyModel");
import PropertyModel = require("./../model/PropertyModel");


class PropertyBusiness implements BaseBusiness<IPropertyModel> {
    private _propertyRepository: PropertyRepository;

    constructor () {
        this._propertyRepository = new PropertyRepository();
    }
    create (item: IPropertyModel, callback: (error: any, result: any) => void) {
	   item._id=mongoose.Types.ObjectId();
       this._propertyRepository.create(item, callback);
    }

    retrieve (query: any, callback: (error: any, result: any) => void) {
        this._propertyRepository.retrieve(query, callback);
    }
    aggregate (query: any, callback: (error: any, result: any) => void) {
        this._propertyRepository.aggregate(query, callback);
    }
	retrieveFields (query: any, fields: any, callback: (error: any, result: any) => void) {
        this._propertyRepository.retrieveFields(query, fields,callback);
    }

    update (_id: string, item: IPropertyModel, callback: (error: any, result: any) => void) {

        this._propertyRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);

            else
                this._propertyRepository.update(res._id, item, callback);

        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._propertyRepository.delete(_id , callback);
    }

    deleteMany (query: any, callback:(error: any, result: any) => void) {
        this._propertyRepository.deleteMany(query , callback);
    }

    findById (_id: string, callback: (error: any, result: IPropertyModel) => void) {
        this._propertyRepository.findById(_id, callback);
    }

    count (query: any, callback: (error: any, result: Number) => void) {
        this._propertyRepository.count(query, callback);
    }
	
    findOne (query: any, callback: (error: any, result: IPropertyModel) => void) {
        this._propertyRepository.findOne(query, callback);
    }
}


Object.seal(PropertyBusiness);
export =PropertyBusiness
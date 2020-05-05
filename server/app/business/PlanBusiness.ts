/**
 * Business Logic for PlanBusiness, called from the Controllers
 */
import express = require("express");
import mongoose = require("mongoose");

import BaseBusiness = require("./BaseBusiness");
import PlanRepository = require("./../repository/PlanRepository");
import IPlanModel = require("./../model/interfaces/IPlanModel");
import PlanModel = require("./../model/PlanModel");


class PlanBusiness implements BaseBusiness<IPlanModel> {
    private _userRepository: PlanRepository;

    constructor () {
        this._userRepository = new PlanRepository();
    }
    create (item: IPlanModel, callback: (error: any, result: any) => void) {
	   item._id=mongoose.Types.ObjectId();
       this._userRepository.create(item, callback);
    }

    retrieve (query: any, callback: (error: any, result: any) => void) {
        this._userRepository.retrieve(query, callback);
    }
    aggregate (query: any, callback: (error: any, result: any) => void) {
        this._userRepository.aggregate(query, callback);
    }
	retrieveFields (query: any, fields: any, callback: (error: any, result: any) => void) {
        this._userRepository.retrieveFields(query, fields,callback);
    }

    update (_id: string, item: IUserModel, callback: (error: any, result: any) => void) {

        this._userRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);

            else
                this._userRepository.update(res._id, item, callback);

        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._userRepository.delete(_id , callback);
    }

    deleteMany (query: any, callback:(error: any, result: any) => void) {
        this._userRepository.deleteMany(query , callback);
    }

    findById (_id: string, callback: (error: any, result: IUserModel) => void) {
        this._userRepository.findById(_id, callback);
    }

    count (query: any, callback: (error: any, result: Number) => void) {
        this._userRepository.count(query, callback);
    }
	
    findOne (query: any, callback: (error: any, result: IUserModel) => void) {
        this._userRepository.findOne(query, callback);
    }
		
}


Object.seal(PlanBusiness);
export = PlanBusiness;
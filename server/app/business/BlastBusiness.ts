/**
 * Business Logic for PlanBusiness, called from the Controllers
 */
import express = require("express");
import mongoose = require("mongoose");

import BaseBusiness = require("./BaseBusiness");
import BlastRepository = require("./../repository/BlastRepository");
import IBlastModel = require("./../model/interfaces/IBlastModel");
import BlastModel = require("./../model/BlastModel");


class BlastBusiness implements BaseBusiness<IBlastModel> {
    private _blastRepository: blastRepository;

    constructor () {
        this._blastRepository = new BlastRepository();
    }
    create (item: IBlastModel, callback: (error: any, result: any) => void) {
	   item._id=mongoose.Types.ObjectId();
       this._blastRepository.create(item, callback);
    }

    retrieve (query: any, callback: (error: any, result: any) => void) {
        this._blastRepository.retrieve(query, callback);
    }
    aggregate (query: any, callback: (error: any, result: any) => void) {
        this._blastRepository.aggregate(query, callback);
    }
	retrieveFields (query: any, fields: any, callback: (error: any, result: any) => void) {
        this._blastRepository.retrieveFields(query, fields,callback);
    }

    update (_id: string, item: IBlastModel, callback: (error: any, result: any) => void) {

        this._blastRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);

            else
                this._blastRepository.update(res._id, item, callback);

        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._blastRepository.delete(_id , callback);
    }

    deleteMany (query: any, callback:(error: any, result: any) => void) {
        this._blastRepository.deleteMany(query , callback);
    }

    findById (_id: string, callback: (error: any, result: IBlastModel) => void) {
        this._blastRepository.findById(_id, callback);
    }

    count (query: any, callback: (error: any, result: Number) => void) {
        this._blastRepository.count(query, callback);
    }
	
    findOne (query: any, callback: (error: any, result: IBlastModel) => void) {
        this._blastRepository.findOne(query, callback);
    }
		
}


Object.seal(BlastBusiness);
export = BlastBusiness;
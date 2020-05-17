/**
 * Business Logic for PlanBusiness, called from the Controllers
 */
import express = require("express");
import mongoose = require("mongoose");

import BaseBusiness = require("./BaseBusiness");
import BlastImageRepository = require("./../repository/BlastImageRepository");
import IBlastImageModel = require("./../model/interfaces/IBlastImageModel");
import BlastImageModel = require("./../model/BlastImageModel");


class BlastImageBusiness implements BaseBusiness<IBlastImageModel> {
    private _blastImageRepository: blastImageRepository;

    constructor () {
        this._blastImageRepository = new BlastImageRepository();
    }
    create (item: IBlastImageModel, callback: (error: any, result: any) => void) {
	   item._id=mongoose.Types.ObjectId();
       this._blastImageRepository.create(item, callback);
    }

    retrieve (query: any, callback: (error: any, result: any) => void) {
        this._blastImageRepository.retrieve(query, callback);
    }
    aggregate (query: any, callback: (error: any, result: any) => void) {
        this._blastImageRepository.aggregate(query, callback);
    }
	retrieveFields (query: any, fields: any, callback: (error: any, result: any) => void) {
        this._blastImageRepository.retrieveFields(query, fields,callback);
    }

    update (_id: string, item: IBlastImageModel, callback: (error: any, result: any) => void) {

        this._blastImageRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);

            else
                this._blastImageRepository.update(res._id, item, callback);

        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._blastImageRepository.delete(_id , callback);
    }

    deleteMany (query: any, callback:(error: any, result: any) => void) {
        this._blastImageRepository.deleteMany(query , callback);
    }

    findById (_id: string, callback: (error: any, result: IBlastImageModel) => void) {
        this._blastImageRepository.findById(_id, callback);
    }

    count (query: any, callback: (error: any, result: Number) => void) {
        this._blastImageRepository.count(query, callback);
    }
	
    findOne (query: any, callback: (error: any, result: IBlastImageModel) => void) {
        this._blastImageRepository.findOne(query, callback);
    }
		
}


Object.seal(BlastImageBusiness);
export =BlastImageBusiness
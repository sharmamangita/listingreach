/**
 * Business Logic for SavedCandidateBusiness, called from the Controllers
 */
import express = require("express");
import mongoose = require("mongoose");
var jwt = require('jsonwebtoken');
var _ = require('lodash');
 
import BaseBusiness = require("./BaseBusiness");
import SavedCandidatesRepository = require("./../repository/SavedCandidatesRepository");
import ISavedCandidatesModel = require("./../model/interfaces/ISavedCandidatesModel");
import SavedCandidatesModel = require("./../model/SavedCandidatesModel");


class SavedCandidateBusiness implements BaseBusiness<ISavedCandidatesModel> {
    private _savedCandidatesRepository: SavedCandidatesRepository;

    constructor () {
        this._savedCandidatesRepository = new SavedCandidatesRepository();
    }

    create (item: ISavedCandidatesModel, callback: (error: any, result: any) => void) {
		item._id=mongoose.Types.ObjectId();
       this._savedCandidatesRepository.create(item, callback);
    }

    retrieve (query: any, callback: (error: any, result: any) => void) {
        this._savedCandidatesRepository.retrieve(query, callback);
    }
    aggregate (query: any, callback: (error: any, result: any) => void) {
        this._savedCandidatesRepository.aggregate(query, callback);
    }
	retrieveFields (query: any, fields: any, callback: (error: any, result: any) => void) {
        this._savedCandidatesRepository.retrieveFields(query, fields,callback);
    }

    update (_id: string, item: ISavedCandidatesModel, callback: (error: any, result: any) => void) {

        this._savedCandidatesRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);

            else
                this._savedCandidatesRepository.update(res._id, item, callback);

        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._savedCandidatesRepository.delete(_id , callback);
    }

    deleteMany (query: any, callback:(error: any, result: any) => void) {
        this._savedCandidatesRepository.deleteMany(query , callback);
    }

    findById (_id: string, callback: (error: any, result: ISavedCandidatesModel) => void) {
        this._savedCandidatesRepository.findById(_id, callback);
    }

    count (query: any, callback: (error: any, result: Number) => void) {
        this._savedCandidatesRepository.count(query, callback);
    }
	
    findOne (query: any, callback: (error: any, result: ISavedCandidatesModel) => void) {
        this._savedCandidatesRepository.findOne(query, callback);
    }
	
	
}


Object.seal(SavedCandidateBusiness);
export = SavedCandidateBusiness;
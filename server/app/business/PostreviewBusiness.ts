/**
 * Business Logic for SavedCandidateBusiness, called from the Controllers
 */
import express = require("express");
import mongoose = require("mongoose");
var jwt = require('jsonwebtoken');
var _ = require('lodash');
 
import BaseBusiness = require("./BaseBusiness");
import PostreviewRepository = require("./../repository/PostreviewRepository");
import IPostreviewModel = require("./../model/interfaces/IPostreviewModel");
import PostreviewModel = require("./../model/PostreviewModel");


class PostreviewBusiness implements BaseBusiness<IPostreviewModel> {
    private _postreviewRepository: PostreviewRepository;

    constructor () {
        this._postreviewRepository = new PostreviewRepository();
    }

    create (item: IPostreviewModel, callback: (error: any, result: any) => void) {
        item._id=mongoose.Types.ObjectId();
        this._postreviewRepository.create(item, callback); 
    }

    retrieve (query: any, callback: (error: any, result: any) => void) {
        this._postreviewRepository.retrieve(query, callback);
    }
    aggregate (query: any, callback: (error: any, result: any) => void) {
        this._postreviewRepository.aggregate(query, callback);
    }
	retrieveFields (query: any, fields: any, callback: (error: any, result: any) => void) {
        this._postreviewRepository.retrieveFields(query, fields,callback);
    }

    update (_id: string, item: IPostreviewModel, callback: (error: any, result: any) => void) {

        this._postreviewRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);

            else
                this._postreviewRepository.update(res._id, item, callback);

        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._postreviewRepository.delete(_id , callback);
    }

    deleteMany (query: any, callback:(error: any, result: any) => void) {
        this._postreviewRepository.deleteMany(query , callback);
    }

    findById (_id: string, callback: (error: any, result: IPostreviewModel) => void) {
        this._postreviewRepository.findById(_id, callback);
    }

    count (query: any, callback: (error: any, result: Number) => void) {
        this._postreviewRepository.count(query, callback);
    }
	
    findOne (query: any, callback: (error: any, result: IPostreviewModel) => void) {
        this._postreviewRepository.findOne(query, callback);
    }
	
	
}


Object.seal(PostreviewBusiness);
export = PostreviewBusiness;
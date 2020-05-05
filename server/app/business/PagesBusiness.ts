/**
 * Business Logic for PagesBusiness, called from the Controllers
 */
import express = require("express");
import mongoose = require("mongoose");

import BaseBusiness = require("./BaseBusiness");
import PagesRepository = require("./../repository/PagesRepository");
import IPagesModel = require("./../model/interfaces/IPagesModel");
import PagesModel = require("./../model/PagesModel");


class PagesBusiness implements BaseBusiness<IPagesModel> {
    private _pagesRepository: PagesRepository;

    constructor () {
        this._pagesRepository = new PagesRepository();
    }

    create (item: IPagesModel, callback: (error: any, result: any) => void) {
		item._id=mongoose.Types.ObjectId();
       this._pagesRepository.create(item, callback);
    }

    retrieve (query: any, callback: (error: any, result: any) => void) {
        this._pagesRepository.retrieve(query, callback);
    }
    aggregate (query: any, callback: (error: any, result: any) => void) {
        this._pagesRepository.aggregate(query, callback);
    }
	retrieveFields (query: any, fields: any, callback: (error: any, result: any) => void) {
        this._pagesRepository.retrieveFields(query, fields,callback);
    }

    update (_id: string, item: IPagesModel, callback: (error: any, result: any) => void) {

        this._pagesRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);

            else
                this._pagesRepository.update(res._id, item, callback);

        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._pagesRepository.delete(_id , callback);
    }

    deleteMany (query: any, callback:(error: any, result: any) => void) {
        this._pagesRepository.deleteMany(query , callback);
    }

    findById (_id: string, callback: (error: any, result: IPagesModel) => void) {
        this._pagesRepository.findById(_id, callback);
    }

    count (query: any, callback: (error: any, result: Number) => void) {
        this._pagesRepository.count(query, callback);
    }
	
    findOne (query: any, callback: (error: any, result: IPagesModel) => void) {
        this._pagesRepository.findOne(query, callback);
    }
		
}


Object.seal(PagesBusiness);
export = PagesBusiness;
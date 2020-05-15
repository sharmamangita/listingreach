/**
 * Business Logic for PlanBusiness, called from the Controllers
 */
import express = require("express");
import mongoose = require("mongoose");

import TemplateBusiness = require("./TemplateBusiness");
import TemplateRepository = require("./../repository/TemplateRepository");
import ITemplateModel = require("./../model/interfaces/ITemplateModel");
import TemplateModel = require("./../model/TemplateModel");


class TemplateBusiness implements TemplateBusiness<ITemplateModel> {
    private _templateRepository: templateRepository;

    constructor () {
        this._templateRepository = new TemplateRepository();
    }
    create (item: ITemplateModel, callback: (error: any, result: any) => void) {
	   item._id=mongoose.Types.ObjectId();
       this._templateRepository.create(item, callback);
    }

    retrieve (query: any, callback: (error: any, result: any) => void) {
        this._templateRepository.retrieve(query, callback);
    }
    aggregate (query: any, callback: (error: any, result: any) => void) {
        this._templateRepository.aggregate(query, callback);
    }
	retrieveFields (query: any, fields: any, callback: (error: any, result: any) => void) {
        this._templateRepository.retrieveFields(query, fields,callback);
    }

    update (_id: string, item: ITemplateModel, callback: (error: any, result: any) => void) {

        this._templateRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);

            else
                this._templateRepository.update(res._id, item, callback);

        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._templateRepository.delete(_id , callback);
    }

    deleteMany (query: any, callback:(error: any, result: any) => void) {
        this._templateRepository.deleteMany(query , callback);
    }

    findById (_id: string, callback: (error: any, result: ITemplateModel) => void) {
        this._templateRepository.findById(_id, callback);
    }

    count (query: any, callback: (error: any, result: Number) => void) {
        this._templateRepository.count(query, callback);
    }
	
    findOne (query: any, callback: (error: any, result: ITemplateModel) => void) {
        this._templateRepository.findOne(query, callback);
    }
		
}


Object.seal(TemplateBusiness);
export = TemplateBusiness;
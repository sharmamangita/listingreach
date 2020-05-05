/**
 * Business Logic for UserBusiness, called from the Controllers
 */
import express = require("express");
import mongoose = require("mongoose");
var jwt = require('jsonwebtoken');
var _ = require('lodash');
 
import BaseBusiness = require("./BaseBusiness");
import ContactformRepository = require("./../repository/ContactformRepository");
import IContactformModel = require("./../model/interfaces/IContactformModel");
import ContactformModel = require("./../model/ContactformModel");


class ContactformBusiness implements BaseBusiness<IContactformModel> {
    private _contactformRepository: ContactRepository;

    constructor () {
        this._contactformRepository = new ContactformRepository();
    }

    create (item: IContactformModel, callback: (error: any, result: any) => void) {
		item._id=mongoose.Types.ObjectId();
       this._contactformRepository.create(item, callback);
    }

    retrieve (query: any, callback: (error: any, result: any) => void) {
        this._contactformRepository.retrieve(query, callback);
    }
    aggregate (query: any, callback: (error: any, result: any) => void) {
        this._contactformRepository.aggregate(query, callback);
    }
	retrieveFields (query: any, fields: any, callback: (error: any, result: any) => void) {
        this._contactformRepository.retrieveFields(query, fields,callback);
    }

    update (_id: string, item: IContactformModel, callback: (error: any, result: any) => void) {

        this._contactformRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);

            else
                this._contactformRepository.update(res._id, item, callback);

        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._contactformRepository.delete(_id , callback);
    }

    deleteMany (query: any, callback:(error: any, result: any) => void) {
        this._contactformRepository.deleteMany(query , callback);
    }

    findById (_id: string, callback: (error: any, result: IContactformModel) => void) {
        this._contactformRepository.findById(_id, callback);
    }

    count (query: any, callback: (error: any, result: Number) => void) {
        this._contactformRepository.count(query, callback);
    }
	
    findOne (query: any, callback: (error: any, result: IContactformModel) => void) {
        this._contactformRepository.findOne(query, callback);
    }
    

	
}


Object.seal(ContactformBusiness);
export = ContactformBusiness;

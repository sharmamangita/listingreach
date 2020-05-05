/**
 * Business Logic for UserBusiness, called from the Controllers
 */
import express = require("express");
import mongoose = require("mongoose");
var jwt = require('jsonwebtoken');
var _ = require('lodash');
 
import BaseBusiness = require("./BaseBusiness");
import InvitationRepository = require("./../repository/InvitationRepository");
import IInvitationModel = require("./../model/interfaces/IInvitationModel");
import InvitationModel = require("./../model/InvitationModel");


class InvitationBusiness implements BaseBusiness<IInvitationModel> {
    private _invitationRepository: InvitationRepository;

    constructor () {
        this._invitationRepository = new InvitationRepository();
    }

    create (item: IInvitationModel, callback: (error: any, result: any) => void) {
		item._id=mongoose.Types.ObjectId();
       this._invitationRepository.create(item, callback);
    }

    retrieve (query: any, callback: (error: any, result: any) => void) {
        this._invitationRepository.retrieve(query, callback);
    }
    aggregate (query: any, callback: (error: any, result: any) => void) {
        this._invitationRepository.aggregate(query, callback);
    }
	retrieveFields (query: any, fields: any, callback: (error: any, result: any) => void) {
        this._invitationRepository.retrieveFields(query, fields,callback);
    }

    update (_id: string, item: IInvitationModel, callback: (error: any, result: any) => void) {

        this._invitationRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);

            else
                this._invitationRepository.update(res._id, item, callback);

        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._invitationRepository.delete(_id , callback);
    }

    deleteMany (query: any, callback:(error: any, result: any) => void) {
        this._invitationRepository.deleteMany(query , callback);
    }

    findById (_id: string, callback: (error: any, result: IInvitationModel) => void) {
        this._invitationRepository.findById(_id, callback);
    }

    count (query: any, callback: (error: any, result: Number) => void) {
        this._invitationRepository.count(query, callback);
    }
	
    findOne (query: any, callback: (error: any, result: IInvitationModel) => void) {
        this._invitationRepository.findOne(query, callback);
    }
    
	
	
	
}


Object.seal(InvitationBusiness);
export = InvitationBusiness;

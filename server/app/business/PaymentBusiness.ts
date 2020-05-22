/**
 * Business Logic for PlanBusiness, called from the Controllers
 */
import express = require("express");
import mongoose = require("mongoose");

import BaseBusiness = require("./BaseBusiness");
import PaymentRepository = require("./../repository/PaymentRepository");
import IPaymentModel = require("./../model/interfaces/IPaymentModel");
import PaymentModel = require("./../model/PaymentModel");


class PaymentBusiness implements BaseBusiness<IPaymentModel> {
    private _paymentRepository: PaymentRepository;

    constructor () {
        this._paymentRepository = new PaymentRepository();
    }
    create (item: IPaymentModel, callback: (error: any, result: any) => void) {
	   item._id=mongoose.Types.ObjectId();
       this._paymentRepository.create(item, callback);
    }

    retrieve (query: any, callback: (error: any, result: any) => void) {
        this._paymentRepository.retrieve(query, callback);
    }
    aggregate (query: any, callback: (error: any, result: any) => void) {
        this._paymentRepository.aggregate(query, callback);
    }
	retrieveFields (query: any, fields: any, callback: (error: any, result: any) => void) {
        this._paymentRepository.retrieveFields(query, fields,callback);
    }

    update (_id: string, item: IUserModel, callback: (error: any, result: any) => void) {

        this._paymentRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);

            else
                this._paymentRepository.update(res._id, item, callback);

        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._paymentRepository.delete(_id , callback);
    }

    deleteMany (query: any, callback:(error: any, result: any) => void) {
        this._paymentRepository.deleteMany(query , callback);
    }

    findById (_id: string, callback: (error: any, result: IUserModel) => void) {
        this._paymentRepository.findById(_id, callback);
    }

    count (query: any, callback: (error: any, result: Number) => void) {
        this._paymentRepository.count(query, callback);
    }
	
    findOne (query: any, callback: (error: any, result: IUserModel) => void) {
        this._paymentRepository.findOne(query, callback);
    }
		
}


Object.seal(PaymentBusiness);
export = PaymentBusiness;
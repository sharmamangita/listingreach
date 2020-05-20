/**
 * Business Logic for AgentBusiness, called from the Controllers
 */
import express = require("express");
import mongoose = require("mongoose");
var jwt = require('jsonwebtoken');
var _ = require('lodash');

import BaseBusiness = require("./BaseBusiness");
import AgentRepository = require("./../repository/AgentRepository");
import IAgentModel = require("./../model/interfaces/IAgentModel");

import AgentModel = require("./../model/AgentModel");
const fs = require('fs');
var conversion = require("phantom-html-to-pdf")({
    phantomPath: "/usr/local/bin/phantomjs"
});
var moment = require('moment');
class AgentBusiness implements BaseBusiness<IAgentModel> {
    private _agentRepository: AgentRepository;

    constructor() {
        this._agentRepository = new AgentRepository();
    }

    create(item: IAgentModel, callback: (error: any, result: any) => void) {
        item._id = mongoose.Types.ObjectId();
        this._agentRepository.create(item, callback);
    }

    retrieve(query: any, callback: (error: any, result: any) => void) {
        this._agentRepository.retrieve(query, callback);
    }
    aggregate(query: any, callback: (error: any, result: any) => void) {
        this._agentRepository.aggregate(query, callback);
    }
    customaggregate(query: any, match: object, group: object, callback: (error: any, result: any) => void) {
        this._agentRepository.customaggregate(query, match, group, callback);
    }
    retrieveFields(query: any, fields: any, callback: (error: any, result: any) => void) {
        this._agentRepository.retrieveFields(query, fields, callback);
    }

    update(_id: string, item: IAgentModel, callback: (error: any, result: any) => void) {

        this._agentRepository.findById(_id, (err, res) => {
            if (err) callback(err, res);

            else
                this._agentRepository.update(res._id, item, callback);

        });
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        this._agentRepository.delete(_id, callback);
    }

    deleteMany(query: any, callback: (error: any, result: any) => void) {
        this._agentRepository.deleteMany(query, callback);
    }

    findById(_id: string, callback: (error: any, result: IAgentModel) => void) {
        this._agentRepository.findById(_id, callback);
    }



    findOne(query: any, callback: (error: any, result: IAgentModel) => void) {
        this._agentRepository.findOne(query, callback);
    }



}


Object.seal(AgentBusiness);
export = AgentBusiness;
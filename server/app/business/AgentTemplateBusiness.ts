/**
 * Business Logic for PlanBusiness, called from the Controllers
 */
import express = require("express");
import mongoose = require("mongoose");

import BaseBusiness = require("./BaseBusiness");
import AgentTemplateRepository = require("./../repository/AgentTemplateRepository");
import IAgentTemplateModel = require("./../model/interfaces/IAgentTemplateModel");
import AgentTemplateModel = require("./../model/AgentTemplateModel");


class AgentTemplateBusiness implements BaseBusiness<IAgentTemplateModel> {
    private _agentTemplateRepository: agentTemplateRepository;

    constructor () {
        this._agentTemplateRepository = new AgentTemplateRepository();
    }
    create (item: IAgentTemplateModel, callback: (error: any, result: any) => void) {
	   item._id=mongoose.Types.ObjectId();
       this._agentTemplateRepository.create(item, callback);
    }

    retrieve (query: any, callback: (error: any, result: any) => void) {
        this._agentTemplateRepository.retrieve(query, callback);
    }
    aggregate (query: any, callback: (error: any, result: any) => void) {
        this._agentTemplateRepository.aggregate(query, callback);
    }
	retrieveFields (query: any, fields: any, callback: (error: any, result: any) => void) {
        this._agentTemplateRepository.retrieveFields(query, fields,callback);
    }

    update (_id: string, item: IAgentTemplateModel, callback: (error: any, result: any) => void) {

        this._agentTemplateRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);

            else
                this._agentTemplateRepository.update(res._id, item, callback);

        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._agentTemplateRepository.delete(_id , callback);
    }

    deleteMany (query: any, callback:(error: any, result: any) => void) {
        this._agentTemplateRepository.deleteMany(query , callback);
    }

    findById (_id: string, callback: (error: any, result: IAgentTemplateModel) => void) {
        this._agentTemplateRepository.findById(_id, callback);
    }

    count (query: any, callback: (error: any, result: Number) => void) {
        this._agentTemplateRepository.count(query, callback);
    }
	
    findOne (query: any, callback: (error: any, result: IAgentTemplateModel) => void) {
        this._agentTemplateRepository.findOne(query, callback);
    }
		
}


Object.seal(AgentTemplateBusiness);
export =AgentTemplateBusiness
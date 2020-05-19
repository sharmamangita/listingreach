/**
 * Business Logic for PlanBusiness, called from the Controllers
 */
import express = require("express");
import mongoose = require("mongoose");

import BaseBusiness = require("./BaseBusiness");
import BlastSettingsRepository = require("../repository/BlastSettingsRepository");
import IBlastSettingsModel = require("../model/interfaces/IBlastSettingsModel");
import BlastSettingsModel = require("../model/BlastSettingsModel");


class BlastSettingsBusiness implements BaseBusiness<IBlastSettingsModel> {
    private _blastSettingsRepository: BlastSettingsRepository;

    constructor() {
        this._blastSettingsRepository = new BlastSettingsRepository();
    }
    create(item: IBlastSettingsModel, callback: (error: any, result: any) => void) {
        item._id = mongoose.Types.ObjectId();
        this._blastSettingsRepository.create(item, callback);
    }

    retrieve(query: any, callback: (error: any, result: any) => void) {
        this._blastSettingsRepository.retrieve(query, callback);
    }
    aggregate(query: any, match: Object, group: object, callback: (error: any, result: any) => void) {
        this._blastSettingsRepository.aggregate(query, match, group, callback);
    }
    retrieveFields(query: any, fields: any, callback: (error: any, result: any) => void) {
        this._blastSettingsRepository.retrieveFields(query, fields, callback);
    }

    update(_id: string, item: IBlastSettingsModel, callback: (error: any, result: any) => void) {

        this._blastSettingsRepository.findById(_id, (err, res) => {
            if (err) callback(err, res);

            else
                this._blastSettingsRepository.update(res._id, item, callback);

        });
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        this._blastSettingsRepository.delete(_id, callback);
    }

    deleteMany(query: any, callback: (error: any, result: any) => void) {
        this._blastSettingsRepository.deleteMany(query, callback);
    }

    findById(_id: string, callback: (error: any, result: IBlastSettingsModel) => void) {
        this._blastSettingsRepository.findById(_id, callback);
    }
    findOne(query: any, callback: (error: any, result: IBlastSettingsModel) => void) {
        this._blastSettingsRepository.findOne(query, callback);
    }
    count(query: any, callback: (error: any, result: Number) => void) {
        this._blastSettingsRepository.count(query, callback);
    }



}


Object.seal(BlastSettingsBusiness);
export = BlastSettingsBusiness;
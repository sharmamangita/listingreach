/**
 * Business Logic for UserBusiness, called from the Controllers
 */
import express = require("express");
import mongoose = require("mongoose");
var jwt = require('jsonwebtoken');
var _ = require('lodash');

import BaseBusiness = require("./BaseBusiness");
import UserRepository = require("./../repository/UserRepository");
import IUserModel = require("./../model/interfaces/IUserModel");

class AdminUserBusiness implements BaseBusiness<IUserModel> {
    private _adminUserRepository: UserRepository;

    constructor() {
        this._adminUserRepository = new UserRepository();
    }

    create(item: IUserModel, callback: (error: any, result: any) => void) {
        console.log("in adminUser  business create");
        console.log(item);
        item._id = mongoose.Types.ObjectId();
        this._adminUserRepository.create(item, callback);
    }

    retrieve(query: any, callback: (error: any, result: any) => void) {
        this._adminUserRepository.retrieve(query, callback);
    }
    aggregate(query: any, match: object, group: object, callback: (error: any, result: any) => void) {
        this._adminUserRepository.aggregate(query, match, group, callback);
    }
    retrieveFields(query: any, fields: any, callback: (error: any, result: any) => void) {
        this._adminUserRepository.retrieveFields(query, fields, callback);
    }

    update(_id: string, item: IUserModel, callback: (error: any, result: any) => void) {
        this._adminUserRepository.findById(_id, (err, res) => {
            if (err) callback(err, res);
            else
                this._adminUserRepository.update(res._id, item, callback);
        });
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        this._adminUserRepository.delete(_id, callback);
    }
    deleteMany(query: any, callback: (error: any, result: any) => void) {
        this._adminUserRepository.deleteMany(query, callback);
    }

    findById(_id: string, callback: (error: any, result: IUserModel) => void) {
        this._adminUserRepository.findById(_id, callback);
    }

    count(query: any, callback: (error: any, result: Number) => void) {
        this._adminUserRepository.count(query, callback);
    }

    findOne(query: any, callback: (error: any, result: IUserModel) => void) {
        this._adminUserRepository.findOne(query, callback);
    }

    createToken(user: any): string {
        //expiresIn seconds
        return jwt.sign({ email: user.email }, '93c7ec1855c74462f00a62degecaef8d', { expiresIn: 60 * 60 * 5 });
    }

    verifyToken(req: express.Request, res: express.Response, callback: (data: any) => void) {
        console.log('Admin: ' + req.url);
        var token = req.headers.authorization;
        var origin = req.headers.origin;
        if (!token) {
            res.status(400);
            res.json({
                "error": "Bad Data"
            });
        } else {
            this._adminUserRepository.findOne({ token: token }, function (err, companyUserData) {
                if (err) {
                    res.status(401).send("Invalid token");
                } else {
                    if (companyUserData && companyUserData.status == "verified" && companyUserData.email != "") {
                        callback(companyUserData);
                    } else {
                        res.status(401).send("Invalid token");
                    }
                }
            });
        }
    }
}


Object.seal(AdminUserBusiness);
export = AdminUserBusiness;
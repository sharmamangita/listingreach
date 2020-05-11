/**
 * interface for User model
 */

import mongoose = require("mongoose");

interface IUserModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    firstName : string,
    lastName : string,
    middleName:string,
    email : string,
    password: string,
    userName: string,
    paidOn:boolean,
 	roles: string,
    status:string,
    lastLogin: Date,
    token: string,
    createdOn: Date,
}

export = IUserModel;
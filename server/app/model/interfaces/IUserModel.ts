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
    roles: string,
    companyName: string,
    previouscompanyName:string,
    status:string,
    amount:string,
    lastLogin: Date,
    token: string,
    paidExpirydate:Date,
    paidOn:boolean,
    hrpaidOn:boolean,
	linkdinId: string,
  
    createdOn: Date,
}

export = IUserModel;
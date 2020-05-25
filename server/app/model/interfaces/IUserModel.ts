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
    companyName:string,
    phone:string,
    city:string,
    zipcode:string,
    country:string,
    state:string,
    status:string,
    lastLogin: Date,
    token: string,
    createdOn: Date,
	isDeleted:boolean,
}

export = IUserModel;
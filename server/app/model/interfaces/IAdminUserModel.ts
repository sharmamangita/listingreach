/**
 * interface for User model
 */

import mongoose = require("mongoose");

interface IAdminUserModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    firstName : string,
    lastName : string,
    email : string,
    password: string,
    lastLogin: Date,
    token: string,
	isActive: boolean
}

export = IAdminUserModel;
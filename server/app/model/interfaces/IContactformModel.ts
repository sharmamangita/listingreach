/**
 * interface for User model
 */

import mongoose = require("mongoose");

interface IContactformModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    fullname : string,
    email : string,
    phone:string,
    message : string
}

export = IContactformModel; 

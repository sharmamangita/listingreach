/**
 * interface for User model
 */

import mongoose = require("mongoose");

interface IBlastImageModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    user_id : mongoose.Types.ObjectId,
    url:string
}

export = IBlastImageModel;
/**
 * interface for User model
 */

import mongoose = require("mongoose");

interface IBlastModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    user_id : mongoose.Types.ObjectId,
    blast_type : string,
    selected_template_id:string,
    selected_template_date : Date
}

export = IBlastModel;
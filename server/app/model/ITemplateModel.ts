/**
 * interface for User model
 */

import mongoose = require("mongoose");

interface ITemplateModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    template_type : string,
    email_subject : string,
    from_line:string,
    address : string,
    headline: string,
    database_id: string,
    template_date:boolean,
 	paid: Date,
    image_id:mongoose.Types.ObjectId,
    status: Date,
    Property_id: mongoose.Types.ObjectId,
    created_on: Date,
}

export = ITemplateModel;
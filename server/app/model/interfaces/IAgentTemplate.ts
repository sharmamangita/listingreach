/**
 * interface for User model
 */

import mongoose = require("mongoose");

interface IAgentTemplateModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    template_type : string,
    email_subject : string,
    from_line:string,
    address : string,
    headline: string,
    database_id: string,
    paid:string,
 	image_id: mongoose.Types.ObjectId,
    status:string,
    Property_id: mongoose.Types.ObjectId,
    userId:mongoose.Types.ObjectId,
    created_on: string
}

export = IAgentTemplate;
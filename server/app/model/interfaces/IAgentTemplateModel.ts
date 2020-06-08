/**
 * interface for User model
 */

import mongoose = require("mongoose");

interface IAgentTemplateModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    template_type: String,
    email_subject: String,
    from_line: String,
    address: String,
    headline: String,
    database_id: String,
    paid: string,
    image_id: mongoose.Types.ObjectId,
    status: string,
    Property_id: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    created_on: string
}

export = IAgentTemplateModel;
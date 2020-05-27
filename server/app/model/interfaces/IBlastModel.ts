/**
 * interface for User model
 */

import mongoose = require("mongoose");

interface IBlastModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    user_id : mongoose.Types.ObjectId,
    blast_type : string,
    selected_template_id:string,
    selected_template_date : Date,
    agentData:{
        name:string,
        designation:string,
        email:string,
        website_url:string,
        phone_number:string,
        company_details:string,
        other_information:string,
        image_url:string,
        logo_url:string
    }
}

export = IBlastModel;
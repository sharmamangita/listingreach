/**
 * interface for agent model
 */

import mongoose = require("mongoose");

interface IAgentModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    user_id : mongoose.Types.ObjectId,
    name : string,
    designation:string;
    email : string,
    website_url:string,
    phone_number:string,
    company_details:string,
    other_information:string,
    image_url: string,
    logo_url: string,
    
    status:string,
    lastLogin: Date,
    token: string,
    createdOn: Date,
    updatedOn: Date,
}

export = IAgentModel;
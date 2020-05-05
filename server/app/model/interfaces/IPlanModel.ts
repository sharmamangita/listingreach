/**
 * interface for Plan model
 */

import mongoose = require("mongoose");

interface IPlanModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    plan : string,
    plan_name : string,
    experience_one:[{
        exp: string;
        price: string;
        
    }],
    experience_two:[{
        exp2: string;
        price2: string;
        
    }],
    experience_three:[{
        exp2: string;
        price3: string;
        
    }] ,
    createdOn: Date,
}

export = IPlanModel;
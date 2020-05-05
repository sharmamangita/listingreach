/**
 * interface for Plan model
 */

import mongoose = require("mongoose");

interface IPostreviewModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    fullname : string,
    email : string,
    company : string,
    candidatereport : string,
    communication : string,
    ownership : string,
    selfdrive : string,
    technicalexp : Object,
    strengths : string,
    improvment : string,
    overall : string,
    status: string,
    userId:string,
    postuserId:string,
    createdOn: Date
}

export = IPostreviewModel;

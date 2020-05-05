/**
 * interface for User model
 */

import mongoose = require("mongoose");

interface ISavedCandidatesModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    user_id:string,
    candidate_id:string,
    saved:string,
    downloaded:string,
    viewed:string,
    paidOn:boolean,
    amount:string,
    createdOn: Date,
}

export = ISavedCandidatesModel;

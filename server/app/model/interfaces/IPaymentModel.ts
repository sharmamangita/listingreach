/**
 * interface for agent model
 */

import mongoose = require("mongoose");

interface IPaymentModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    user_id : mongoose.Types.ObjectId,
    blast_id: mongoose.Types.ObjectId,
    amount:string,
    createdOn: Date,
    updatedOn: Date,
}

export = IPaymentModel;
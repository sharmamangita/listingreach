/**
 * interface for Plan model
 */

import mongoose = require("mongoose");

interface IBlastSettingsModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    per_email_blast_price : mongoose.Schema.Types.Decimal128,
    additional_email_blast_price : mongoose.Schema.Types.Decimal128,
    modifiedOn: Date,
}

export = IBlastSettingsModel;
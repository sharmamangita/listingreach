/**
 * interface for Plan model
 */

import mongoose = require("mongoose");
import { Decimal128 } from "mongodb";

interface IBlastSettingsModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    per_email_blast_price : Decimal128,
    additional_email_blast_price : Decimal128,
    modifiedOn: Date,
}

export = IBlastSettingsModel;
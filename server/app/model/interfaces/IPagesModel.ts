/**
 * interface for Plan model
 */

import mongoose = require("mongoose");

interface IPagesModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    page : string,
    content : string
}

export = IPagesModel;
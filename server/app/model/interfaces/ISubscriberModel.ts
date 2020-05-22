/**
 * interface for agent model
 */

import mongoose = require("mongoose");

interface ISubscriberModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    name:  String,
    email: String,
    phone: String,
    city: String,
    state: String,
    status: String,
    propertyTypes: [String],
    priceRanges: [{
        text: String,
        min: Number,
        max: Number
    }],
    includeRentedProperties: Boolean,
    includeOutsideAreaProperties: Boolean,
    agentTypes: [String],
    mailingLists: [String],
    createdOn: Date,
    updateOn: Date
}

export = ISubscriberModel;


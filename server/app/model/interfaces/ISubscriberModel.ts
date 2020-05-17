/**
 * interface for agent model
 */

import mongoose = require("mongoose");

interface ISubscriberModel extends mongoose.Document {   
    name: String,
    email: String,
    phone: String
    city: String
    state: String
    propertyTypes: Array<String>,
    priceRanges: Array<String>
    includeRentedProperties: Boolean,
    agentTypes: Array<String>
    mailingLists: Array<String>
    createdOn: Date,
    updateOn: Date
}

export = ISubscriberModel;
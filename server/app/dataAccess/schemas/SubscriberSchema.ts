import DataAccess = require('../DataAccess');
import mongo = require("mongoose");
var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class SubscriberSchema {
    static get schema() {
        var schema = mongoose.Schema({
            _id: mongo.Schema.Types.ObjectId,
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true,
                unique: true
            },
            phone: {
                type: String
            },
            city: {
                type: String
            },
            state: {
                type: String
            },
            status: {
                type: String,
                required: true
            },
            propertyTypes: {
                type: [String],
                required: true
            },
            priceRanges:
                [{
                    text: { type: String },
                    min: { type: Number },
                    max: { type: Number }
                }],
            includeRentedProperties: {
                type: Boolean,
                default: false
            },
            includeOutsideAreaProperties: {
                type: Boolean,
                default: true
            },
            agentTypes: {
                type: [String]
            },
            mailingLists: {
                type: [],
                required: true
            },
            createdOn: {
                type: Date,
                required: true
            },
            updateOn: {
                type: Date
            }
        }, { _id: false });

        return schema;
    }
}

// we need to create a model using it
var SubscriberModal = mongooseConnection.model("Subscribers", SubscriberSchema.schema);
export = SubscriberModal;



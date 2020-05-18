import DataAccess = require('../DataAccess');
var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class SubscriberSchema {
    static get schema() {
        var schema = mongoose.Schema({
            _id: mongoose.Schema.Types.ObjectId,
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
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
            propertyTypes: {
                type: Array,
                required: true
            },
            priceRanges: {
                type: Array
            },
            includeRentedProperties: {
                type: Boolean,
                default: false
            },
            includeOutsideAreaProperties: {
                type: Boolean,
                default: true
            },
            agentTypes: {
                type: Array
            },
            mailingLists: {
                type: Array
            },
            createdOn: {
                type: Date,
                required: true
            },
            updateOn: {
                type: Date
            }
        });

        return schema;
    }
}

// we need to create a model using it
var AgentModel = mongooseConnection.model("Subscribers", SubscriberSchema.schema);
export = AgentModel;



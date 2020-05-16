/**
 * agnet schema for collections: agent
 */

import DataAccess = require('../DataAccess');
import Users = require('./UserSchema');
var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class AgentSchema {
    static get schema () {
        var schema =  mongoose.Schema({
           _id: mongoose.Schema.Types.ObjectId,
            userId: {
                type: mongoose.Schema.Types.ObjectId, ref: Users
            },
            name : {
                type: String
            },
            designation : {
                type: String
            },
            email : {
                type: String
            },
            website_url : {
                type: String
            },
            phone_number : {
                type: String
            },
            company_details : {
                type: String
            },
            other_information : {
                type: String
            },
            image_url : {
                type: String
            },
            logo_url : {
                type: String
            },
            createdOn: {
                type: Date,
                required: true
            },
            updateOn: {
                type: Date
            },
        });

        return schema;
    }
}

// we need to create a model using it
var AgentModel = mongooseConnection.model("Agents", AgentSchema.schema);
export = AgentModel;



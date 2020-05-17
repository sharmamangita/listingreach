/**
 * company schema for collections: companies
 */

import DataAccess = require('../DataAccess');

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class AgentTemplateSchema {
    static get schema () {
        var schema =  mongoose.Schema({
           _id: mongoose.Schema.Types.ObjectId,
            template_type : {
                type: String
            },
            email_subject : {
                type: String
            },
            from_line: {
                type: String,
            },
            address : {
                type: String,
            },
            headline : {
                type: String
            },
            database_id: {
                type: String
            },
             paid : {
                type: String,
            },
            image_id : {
                type: mongoose.Schema.Types.ObjectId
            },
            status: {
                type: String,
            },
            Property_id:{
                type: mongoose.Schema.Types.ObjectId,   

            },
            created_on:{
                type: String,  
            },
            userId:{
                type: mongoose.Schema.Types.ObjectId,
            }
        });

        return schema;
    }
}

// we need to create a model using it
var AgentTemplateModel = mongooseConnection.model("template", AgentTemplateSchema.schema);
export = AgentTemplateModel;


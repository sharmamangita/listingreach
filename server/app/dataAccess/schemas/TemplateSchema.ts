/**
 * company schema for collections: companies
 */

import DataAccess = require('../DataAccess');

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class TemplateSchema {
    static get schema () {
        var schema =  mongoose.Schema({
           _id: mongoose.Schema.Types.ObjectId,
            template_type : {
                type: String,
                required: true
            },
            email_subject : {
                type: String
            },
            from_line: {
                type: Date,
                required: true
            },
            address : {
                type: String,
                required: true
            },
            headline : {
                type: String,
                required: true
            },
            database_id : {
                type: String,
                required: true
            },
            template_date:{
                tape:Date
            },
            paid:{
                type:Boolean
            },
            image_id:{
                type: mongoose.Schema.Types.ObjectId
            },
            status:{
                type:String
            },
            Property_id:{
                type:mongoose.Schema.Types.ObjectId
            },
            created_on:{
                type:Date
            }
        });

        return schema;
    }
}

// we need to create a model using it
var TemplateModel = mongooseConnection.model("template", TemplateSchema.schema);
export = TemplateModel;



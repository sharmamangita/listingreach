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
            user_id : {
                type: String,
                required: true
            },
            blast_type : {
                type: String,
                required: true
            },
            selected_template_id : {
                type: String
            },
            selected_template_date: {
                type: Date,
                required: true
            }
        });

        return schema;
    }
}

// we need to create a model using it
var TemplateModel = mongooseConnection.model("template", TemplateSchema.schema);
export = TemplateModel;



/**
 * company schema for collections: companies
 */

import DataAccess = require('../DataAccess');

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class PagesSchema {
    static get schema () {
        var schema =  mongoose.Schema({
           _id: mongoose.Schema.Types.ObjectId,
            page : {
                type: String,
                required: true
            },
            content : {
                type: String,
                required: true
            }
        });

        return schema;
    }
}

// we need to create a model using it
var PagesModel = mongooseConnection.model("Pages", PagesSchema.schema);
export = PagesModel;



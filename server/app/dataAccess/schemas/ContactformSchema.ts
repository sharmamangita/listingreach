/**
 * company schema for collections: companies
 */

import DataAccess = require('../DataAccess');

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class ContactformSchema {
    static get schema () {
        var schema =  mongoose.Schema({
           _id: mongoose.Schema.Types.ObjectId,
            fullname : {
                type: String,
                required: true
            },
            email : {
                type: String,
                required: true
            },
            phone : {
                type: String
                required: true
            },
            message : {
				type: String
                required: true
            },
             createdOn: {
                type: Date,
                required: true
            }
        });

        return schema;
    }
}

// we need to create a model using it
var ContactformModel = mongooseConnection.model("Contactform", ContactformSchema.schema);
export = ContactformModel;



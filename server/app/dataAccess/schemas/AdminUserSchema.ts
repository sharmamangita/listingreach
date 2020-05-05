/**
 * company schema for collections: companies
 */

import DataAccess = require('../DataAccess');


var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class AdminUserSchema {
    static get schema () {
        var schema =  mongoose.Schema({
           _id: mongoose.Schema.Types.ObjectId,
            firstName : {
                type: String,
                required: true
            },
            lastName : {
                type: String
            },
            email: {
                type: String,
                required: true,
                unique: true
            },
            password: {
                type: String,
                required: true
            },
			lastLogin:{
                type: Date
			},
			token:{
                type: String
			},
			isActive:{
                type: Boolean
			}
        });

        return schema;
    }
}

// we need to create a model using it
var AdminUserModel = mongooseConnection.model("Admin_Users", AdminUserSchema.schema);
export = AdminUserModel;



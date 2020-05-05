/**
 * company schema for collections: companies
 */

import DataAccess = require('../DataAccess');

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class UserSchema {
    static get schema () {
        var schema =  mongoose.Schema({
           _id: mongoose.Schema.Types.ObjectId,
            firstName : {
                type: String,
                required: true
            },
            lastName : {
                type: String,
                required: true
            },
            middleName : {
                type: String
            },
            email: {
                type: String,
                required: true,
                unique: true
            },
            password: {
                type: String
            },
			companyName:{
                type: String
            },
            previouscompanyName:{
                type: String
            },
            roles:{
                type: String,
                required: true
            },

			lastLogin:{
                type: Date
			},
			token:{
                type: String
			},
			status:{
                type: String
			},
            paidExpirydate:{
                type:Date
            },
            paidOn:{
                type: Boolean
            },
            hrpaidOn:{
                type: Boolean
            },
            amount:{
                type:String
            },
            linkdinId:{
                type:String
            },
            createdOn: {
                type: Date,
                required: true
            },
        });

        return schema;
    }
}

// we need to create a model using it
var UserModel = mongooseConnection.model("Users", UserSchema.schema);
export = UserModel;



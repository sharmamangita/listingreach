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
			userName:{
                type: String,
                required: true
            },
            roles:{
                type: String,
                required: true
            },

            companyName:{
                type: String,
            },
            phone:{
                type: String,
            },
            mobileno:{
                type:String,
            },
            city:{
                type: String,
            },
            country:{
                type: String,
            },
            zipcode:{
                type: String,
            },
            state:{
                type: String,
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
            paidOn:{
                type: Boolean
            },
            
            createdOn: {
                type: Date,
                required: true
            },
			
			isDeleted: {
                type: Boolean,
            },
        });

        return schema;
    }
}

// we need to create a model using it
var UserModel = mongooseConnection.model("Users", UserSchema.schema);
export = UserModel;



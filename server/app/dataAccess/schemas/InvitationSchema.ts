/**
 * company schema for collections: companies
 */

import DataAccess = require('../DataAccess');
import Users = require('./UserSchema');
var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class InvitationSchema {
    static get schema () {
        var schema =  mongoose.Schema({
           _id: mongoose.Schema.Types.ObjectId,
            fullName : {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true,
                unique: true
            },
			userId: {
                    type: mongoose.Schema.Types.ObjectId, ref: Users
            },
			status:{
                type: String
			},
            linkdinId:{
                type:String
            },
            websiteref:{
              type:String 
            },
            token:{
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
var InvitationModel = mongooseConnection.model("Invitations", InvitationSchema.schema);
export = InvitationModel;



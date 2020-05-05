/**
 * company schema for collections: companies
 */

import DataAccess = require('../DataAccess');
import Users = require('./UserSchema');
var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class SavedCandidatesSchema {
    static get schema () {
        var schema =  mongoose.Schema({
           _id: mongoose.Schema.Types.ObjectId,
            user_id: {
                    type: mongoose.Schema.Types.ObjectId, ref: Users
            },
            candidate_id:{
                type: mongoose.Schema.Types.ObjectId
            },
            saved:{
                type:String
            },
            downloaded:{
                type:String
            },
            viewed:{
                type:String
            },
            paidOn:{
                type: Boolean
            },
            amount:{
                type:String
            },
            createdOn: {
                type: Date
            }
        });

        return schema;
    }
}

// we need to create a model using it
var SavedCandidatesModel = mongooseConnection.model("saved_candidates", SavedCandidatesSchema.schema);
export = SavedCandidatesModel;



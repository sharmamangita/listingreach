/**
 * company schema for collections: companies
 */

import DataAccess = require('../DataAccess');

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class BlastImageSchema {
    static get schema () {
        var schema =  mongoose.Schema({
           _id: mongoose.Schema.Types.ObjectId,
            user_id : {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            url : {
                type: String,
                required: true
            }
        });

        return schema;
    }
}

// we need to create a model using it
var BlastImageModel = mongooseConnection.model("blastImage", BlastImageSchema.schema);
export = BlastImageModel;



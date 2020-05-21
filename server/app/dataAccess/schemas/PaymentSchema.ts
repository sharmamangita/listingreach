/**
 * company schema for collections: companies
 */

import DataAccess = require('../DataAccess');

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class PaymentSchema {
    static get schema () {
        var schema =  mongoose.Schema({
           _id: mongoose.Schema.Types.ObjectId,
            user_id : {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            blast_id : {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            amount : {
                type: String,
                required: true
            },
            createdOn: {
                type: Date,
                required: true
            }
            updateOn: {
                type: Date
                
            }
        });

        return schema;
    }
}

// we need to create a model using it
var PaymentModel = mongooseConnection.model("payment", PaymentSchema.schema);
export = PaymentModel;



/**
 * company schema for collections: companies
 */

import DataAccess = require('../DataAccess');
var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class BlastSettingsSchema {
    static get schema() {
        var schema = mongoose.Schema({           
            per_email_blast_price: {
                type: Number,
                required: true
            },
            additional_email_blast_price: {
                type: Number
            },
            modifiedOn: {
                type: Date,
                required: true
            },
        });

        return schema;
    }
}

// we need to create a model using it
var BlastSettingsModel = mongooseConnection.model("Blast_Settings", BlastSettingsSchema.schema);
export = BlastSettingsModel;



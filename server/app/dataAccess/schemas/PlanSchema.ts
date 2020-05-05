/**
 * company schema for collections: companies
 */

import DataAccess = require('../DataAccess');

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class PlanSchema {
    static get schema () {
        var schema =  mongoose.Schema({
           _id: mongoose.Schema.Types.ObjectId,
            plan : {
                type: String,
                required: true
            },

            experience_one:[ {
                exp:{
                    type: String
                },
                price:{
                    type: String
                }
            }],
            experience_two: [{
                exp2:{
                    type: String
                },
                price2:{
                    type: String
                }
            }],
            experience_three:[{
                exp3:{
                    type: String
                },
                price3:{
                    type: String
                }
            }],
            
            plan_name: {
                type: String,
                required: true,
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
var PlanModel = mongooseConnection.model("Plans", PlanSchema.schema);
export = PlanModel;



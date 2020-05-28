/**
 * company schema for collections: companies
 */

import DataAccess = require('../DataAccess');

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class BlastSchema {
    static get schema() {
        var schema = mongoose.Schema({
            _id: mongoose.Schema.Types.ObjectId,
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            blast_type: {
                type: String,
                required: true
            },
            scheduledDate: {
                type: Date,
                required: true
            },
            selected_template_id: {
                type: String
            },
            selected_template_date: {
                type: Date,
                required: true
            },
            agentData: {
                name: {
                    type: String
                },
                designation: {
                    type: String
                },
                email: {
                    type: String
                },
                website_url: {
                    type: String
                },
                phone_number: {
                    type: String
                },
                company_details: {
                    type: String
                },
                other_information: {
                    type: String
                },
                image_url: {
                    type: String
                },
                logo_url: {
                    type: String
                }
            },
            status: {
                type: String,
            },
            associations:[{
                association:{
                    id:{
                     type:String
                    },
                    name:{
                       type:String 
                    }   
                },
                segments:[]
            }]

        });

        return schema;
    }
}

// we need to create a model using it
var BlastModel = mongooseConnection.model("blast", BlastSchema.schema);
export = BlastModel;



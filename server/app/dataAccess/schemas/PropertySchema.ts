/**
 * company schema for collections: companies
 */

import DataAccess = require('../DataAccess');

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class PropertySchema {
    static get schema () {
        var schema =  mongoose.Schema({
           _id: mongoose.Schema.Types.ObjectId,
            display_method : {
                type: String,
                required: true
            },
            street_address : {
                type: String
            },
            city: {
                type: String,
                required: true
            },
            state : {
                type: String,
                required: true
            },
            zipcode : {
                type: String
            },
            mls_number: {
                type: String,
                required: true
            },
             board : {
                type: String,
                required: true
            },
            property_type : {
                type: String
            },
            property_style: {
                type: String,
                required: true
            },
            price:{
                type: String,
                required: true
            },
            building_size:{
                type: String,
                required: true    

            },
            lot_size:{
                type: String,
                required: true    
            },
            number_bedrooms:{
                type: String,
                required: true    
            },
            number_bathrooms:{
                type: String,
                required: true    
            },
            year_built:{
                type: String,
                required: true    
            },
            number_stories:{
                type: String,
                required: true    
            },
            garage:{
                type: String,
                required: true    
            },
            property_details:{
                type: String,
                required: true                    
            }
            priceinfo:[{
                price:{
                 type:String,
                },
                priceType:{
                 type:String
                }
            }],



        });

        return schema;
    }
}

// we need to create a model using it
var PropertyModel = mongooseConnection.model("property", PropertySchema.schema);
export = PropertyModel;



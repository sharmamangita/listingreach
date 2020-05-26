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
           blast_id:{
               type:mongoose.Schema.Types.ObjectId
           },
            display_method : {
                type: String
            },
            street_address : {
                type: String
            },
            city: {
                type: String
            },
            state : {
                type: String
            },
            zipcode : {
                type: String
            },
            mls_number: {
                type: String
            },
             board : {
                type: String
            },
            property_type : {
                type: String
            },
            property_style: {
                type: String
            },
            building_size:{
                type: String  
            },
            lot_size:{
                type: String 
            },
            number_bedrooms:{
                type: String
            },
            year_built:{
                type: String 
            },
            number_stories:{
                type: String    
            },
            garage:{
                type: String  
            },
            property_details:{
                type: String                  
            },
            price:{
                type: String                  
            },
            garageSize:{
                type: String 
            },
            pricingInfo:[{
                price:{
                 type:String
                },
                priceType:{
                 type:String
                }
            }],
            number_bathrooms:[{
                full:{
                 type:String
                },
                half:{
                 type:String
                }
            }],

            linksToWebsites:[{
                linksToWebsiteData:Object
            }],

            isOpenHouse:[{
                openHouseData:Object
            }],
            userId:{
                type:mongoose.Schema.Types.ObjectId
            },
            propertyImages:[{
               imageId:String,
               imageUrl:String
            }],

        });

        return schema;
    }
}

// we need to create a model using it
var PropertyModel = mongooseConnection.model("property", PropertySchema.schema);
export = PropertyModel;



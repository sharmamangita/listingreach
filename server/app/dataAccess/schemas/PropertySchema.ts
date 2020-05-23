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
            agentData:[{
                name:{
                 type:String
                },
                designation:{
                 type:String
                },
                email:{
                 type:String
                },
                website_url:{
                 type:String
                },
                phone_number:{
                 type:String
                },
                company_details:{
                 type:String
                },
                other_information:{
                 type:String
                },
                image_url:{
                 type:String
                },
                logo_url:{
                 type:String
                }
            }],
            isOpenHouse:[{
                openHouseData:Object
            }],
            userId:{
                type:mongoose.Schema.Types.ObjectId
            },
        });

        return schema;
    }
}

// we need to create a model using it
var PropertyModel = mongooseConnection.model("property", PropertySchema.schema);
export = PropertyModel;



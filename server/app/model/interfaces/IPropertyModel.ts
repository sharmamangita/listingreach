/**
 * interface for User model
 */

import mongoose = require("mongoose");

interface IPropertyModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    display_method : string,
    street_address : string,
    city:string,
    state : string,
    zipcode: string,
    mls_number: string,
    board:string,
 	property_type: string,
    property_style:string,
    building_size: string,
    lot_size: string,
    number_bedrooms:string,
    year_built: string,
    number_stories: string,
    garage:string,
    garageSize:string,
    property_details: string,
    price:string,
    userId:mongoose.Types.ObjectId,
    pricingInfo:[{
        price: string,
        priceType: string
        
    }],
    number_bathrooms:[{
        full: string,
        half: string
    }],
    linksToWebsites:[{
        linksToWebsiteData:Object
    }],
    isOpenHouse:[{
        openHouseData:Object
    }],
    agentData:[{
        name:string,
        designation:string,
        email:string,
        website_url:string,
        phone_number:string,
        company_details:string,
        other_information:string,
        image_url:string,
        logo_url:string
    }]
}

export = IPropertyModel;
/**
 * interface for User model
 */

import mongoose = require("mongoose");

interface IPropertyModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    blast_id: mongoose.Types.ObjectId,
    display_method: string,
    street_address: string,
    city: string,
    state: string,
    zipcode: string,
    mls_number: string,
    board: string,
    property_type: string,
    property_style: string,
    building_size: string,
    lot_size: string,
    number_bedrooms: string,
    year_built: string,
    number_stories: string,
    garage: string,
    garageSize: string,
    property_details: string,
    price: string,
    userId: mongoose.Types.ObjectId,
    pricingInfo: {
        price: string,
        priceType: string
    },
    number_bathrooms: {
        full: string,
        half: string
    }[],
    linksToWebsites: {
        text: String,
        url: String
    }[],
    isOpenHouse: {
        houseType: String,
        date: Date,
        startTime: String,
        endTime: String
    }[],
    propertyImages: {
        imageId: String,
        imageUrl: String
    }[]


}

export = IPropertyModel;
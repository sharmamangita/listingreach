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
    price: string,
    building_size: string,
    lot_size: string,
    number_bedrooms:string,
    number_bathrooms : string,
    year_built: string,
    number_stories: string,
    garage:string,
    property_details: string,
}

export = IPropertyModel;
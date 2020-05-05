/**
 * interface for Company model
 */

import mongoose = require("mongoose");

interface IAddressModel extends mongoose.Document {
    street: string;
    building: string;
    city: string;
    state: string;
    country: string;
    timezone: string;
   
    postCode: string;
}

export = IAddressModel;
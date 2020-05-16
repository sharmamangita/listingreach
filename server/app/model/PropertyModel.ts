/**
 * User model
 */
import mongoose = require("mongoose");

import IPropertyModel = require('./interfaces/IPropertyModel');

class PropertyModel {

    private _invitationModel :propertyModel;

    constructor(PropertyModel: IPropertyModel) {
        this._propertyModel = PropertyModel;
    }
    get _id (): mongoose.Types.ObjectId {
        return this.propertyModel._id;
    }
    get display_method (): string {
        return this.propertyModel.display_method;
    }

    get street_address (): string {
        return this.propertyModel.street_address;
    }
    get city (): string {
        return this.propertyModel.city;
    }
   
    get zipcode (): string {
        return this.propertyModel.zipcode;
    }
    get mls_number (): string {
        return this.propertyModel.mls_number;
    }

	get board (): string {
        return this.propertyModel.board;
    }

    get property_type (): string {
        return this.propertyModel.property_type;
    }
    get property_style (): string {
        return this.propertyModel.property_style;
    }

    get price (): string {
        return this.propertyModel.price;
    }

    get building_size (): string {
        return this.propertyModel.building_size;
    }

    get lot_size (): string {
        return this.propertyModel.lot_size;
    }

    get number_bedrooms (): string {
        return this.propertyModel.number_bedrooms;
    }

    get number_bathrooms (): string {
        return this.propertyModel.number_bathrooms;
    }

    get year_built (): string {
        return this.propertyModel.year_built;
    }

    get number_stories (): string {
        return this.propertyModel.number_stories;
    }

    get garage (): string {
        return this.propertyModel.garage;
    }

    get property_details (): string {
        return this.propertyModel.property_details;
    }

    get priceinfo (): object {
        return this.propertyModel.priceinfo;
    }

    get link_website (): object {
        return this.propertyModel.link_website;
    }
	
}
Object.seal(PropertyModel);
export =  PropertyModel;


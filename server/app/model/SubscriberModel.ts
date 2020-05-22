/**
 * User model
 */
import mongoose = require("mongoose");
import ISubscriberModel = require("./interfaces/ISubscriberModel");
class SubscriberModel {
    private _modal: ISubscriberModel;

    constructor(UserModel: ISubscriberModel) {
        this._modal = UserModel;
    }
    get _id(): mongoose.Types.ObjectId {
        return this._modal._id;
    }
    get name(): String {
        return this._modal.name
    }
    get email(): String {
        return this._modal.email
    }
    get phone(): String {
        return this._modal.phone
    }
    get city(): String {
        return this._modal.city
    }
    get state(): String {
        return this._modal.state
    }
    get status(): String {
        return this._modal.status
    }
    get propertyTypes(): String[] {
        return this._modal.propertyTypes
    }
    get priceRanges(): Object[] {
        return this._modal.priceRanges
    }
    get includeRentedProperties(): Boolean {
        return this._modal.includeRentedProperties
    }
    get includeOutsideAreaProperties(): Boolean {
        return this._modal.includeOutsideAreaProperties
    }
    get agentTypes(): String[] {
        return this._modal.agentTypes
    }

    get mailingLists(): String[] {
        return this._modal.mailingLists
    }
    get createdOn(): Date {
        return this._modal.createdOn
    }
    get updateOn(): Date {
        return this._modal.updateOn
    }
}
Object.seal(SubscriberModel);
export =  SubscriberModel;


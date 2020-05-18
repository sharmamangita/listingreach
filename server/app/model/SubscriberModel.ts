/**
 * User model
 */
import mongoose = require("mongoose");
class SubscriberModel {
    id: mongoose.Schema.Types.ObjectId;
    name: String;
    email: String;
    phone: String;
    city: String;
    state: String;
    propertyTypes: String[];
    priceRanges: String[];
    includeRentedProperties: Boolean;
    includeOutsideAreaProperties: Boolean;
    agentTypes: String[];
    mailingLists: String[];
    createdOn: Date;
    updateOn: Date;
}
Object.seal(SubscriberModel);
export =  SubscriberModel;


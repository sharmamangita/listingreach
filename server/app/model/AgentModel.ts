/**
 * User model
 */
import mongoose = require("mongoose");

import IAgentModel = require('./interfaces/IAgentModel');

class AgentModel {

    private _agentModel : IAgentModel;

    constructor(AgentModel: IAgentModel) {
        this._agentModel = AgentModel;
    }
    get _id (): mongoose.Types.ObjectId {
        return this._agentModel._id;
    }
    get user_id (): mongoose.Types.ObjectId {
        return this._agentModel.user_id;
    }
    get name (): String {
        return this._agentModel.name;
    }
    get designation (): String {
        return this._agentModel.designation;
    }
    get email (): String {
        return this._agentModel.email;
    }
    get website_url():String{
        return this._agentModel.website_url;
    }
    get phone_number():String{
        return this._agentModel.phone_number;
    }
    get company_details():String{
        return this._agentModel.company_details;
    }
    get other_information():String{
        return this._agentModel.other_information;
    }
    get image_url (): String {
        return this._agentModel.image_url;
    }
    get logo_url (): String {
        return this._agentModel.logo_url;
    }
    get createdOn (): Date {
        return this._agentModel.createdOn;
    }
    get updateOn (): Date {
        return this._agentModel.updatedOn;
    }
	
}
Object.seal(AgentModel);
export =  AgentModel;


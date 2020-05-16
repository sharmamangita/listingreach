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
    get name (): string {
        return this._agentModel.name;
    }
    get designation (): string {
        return this._agentModel.designation;
    }
    get email (): string {
        return this._agentModel.email;
    }
    get website_url():string{
        return this._agentModel.website_url;
    }
    get phone_number():string{
        return this._agentModel.phone_number;
    }
    get company_details():string{
        return this._agentModel.company_details;
    }
    get other_information():string{
        return this._agentModel.other_information;
    }
    get image_url (): string {
        return this._agentModel.image_url;
    }
    get logo_url (): string {
        return this._agentModel.logo_url;
    }
    get createdOn (): Date {
        return this._userModel.createdOn;
    }
    get updateOn (): Date {
        return this._userModel.updateOn;
    }
	
}
Object.seal(UserModel);
export =  UserModel;


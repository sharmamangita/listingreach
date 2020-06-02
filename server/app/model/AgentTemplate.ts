/**
 * User model
 */
import mongoose = require("mongoose");

import IAgentTemplateModel = require('./interfaces/IAgentTemplateModel');

class AgentTemplate {

    private _agentTemplateModel :IAgentTemplateModel;

    constructor(AgentTemplateModel: IAgentTemplateModel) {
        this._agentTemplateModel = AgentTemplateModel;
    }
    get _id (): mongoose.Types.ObjectId {
        return this._agentTemplateModel._id;
    }
    get template_type (): string {
        return this._agentTemplateModel.template_type;
    }

    get email_subject (): string {
        return this._agentTemplateModel.email_subject;
    }
    get from_line (): string {
        return this._agentTemplateModel.from_line;
    }
   
    get address (): string {
        return this._agentTemplateModel.address;
    }
    get headline (): string {
        return this._agentTemplateModel.headline;
    }

	get database_id (): string {
        return this._agentTemplateModel.database_id;
    }

    get paid (): string {
        return this._agentTemplateModel.paid;
    }
    get image_id (): mongoose.Types.ObjectId  {
        return this._agentTemplateModel.image_id;
    }

    get status (): string {
        return this._agentTemplateModel.status;
    }

    get Property_id (): mongoose.Types.ObjectId {
        return this._agentTemplateModel.Property_id;
    }

    get userId (): mongoose.Types.ObjectId {
        return this._agentTemplateModel.Property_id;
    }
    
    get created_on (): string {
        return this._agentTemplateModel.created_on;
    }


}
Object.seal(AgentTemplate);
export =  AgentTemplate;


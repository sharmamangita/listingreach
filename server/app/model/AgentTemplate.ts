/**
 * User model
 */
import mongoose = require("mongoose");

import IAgentTemplateModel = require('./interfaces/IAgentTemplateModel');

class AgentTemplate {

    private _agentTemplateModel :agentTemplateModel;

    constructor(AgentTemplateModel: IAgentTemplateModel) {
        this._agentTemplateModel = AgentTemplateModel;
    }
    get _id (): mongoose.Types.ObjectId {
        return this.agentTemplate._id;
    }
    get template_type (): string {
        return this.agentTemplate.template_type;
    }

    get email_subject (): string {
        return this.agentTemplate.email_subject;
    }
    get from_line (): string {
        return this.agentTemplate.from_line;
    }
   
    get address (): string {
        return this.agentTemplate.address;
    }
    get headline (): string {
        return this.agentTemplate.headline;
    }

	get database_id (): string {
        return this.agentTemplate.database_id;
    }

    get paid (): string {
        return this.agentTemplate.paid;
    }
    get image_id (): mongoose.Types.ObjectId  {
        return this.agentTemplate.image_id;
    }

    get status (): string {
        return this.agentTemplate.status;
    }

    get Property_id (): mongoose.Types.ObjectId {
        return this.agentTemplate.Property_id;
    }

    get userId (): mongoose.Types.ObjectId {
        return this.agentTemplate.Property_id;
    }
    
    get created_on (): string {
        return this.agentTemplate.created_on;
    }


}
Object.seal(AgentTemplate);
export =  AgentTemplate;


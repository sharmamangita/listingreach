/**
 * application model repository
 */

import AgentTemplateSchema = require("./../dataAccess/schemas/AgentTemplateSchema");
import RepositoryBase = require("./BaseRepository");
import IAgentTemplateModel = require("./../model/interfaces/IAgentTemplateModel");

class AgentTemplateRepository  extends RepositoryBase<IAgentTemplateModel> {
    constructor () {
        super(AgentTemplateSchema);
    }
	

}

Object.seal(AgentTemplateRepository);
export = AgentTemplateRepository;
/**
 * application model repository
 */

import AgentSchema = require("./../dataAccess/schemas/AgentSchema");
import RepositoryBase = require("./BaseRepository");
import IAgentModel = require("./../model/interfaces/IAgentModel");

class AgentRepository  extends RepositoryBase<IAgentModel> {
    constructor () {
        super(AgentSchema);
    }
	

}

Object.seal(AgentRepository);
export = AgentRepository;
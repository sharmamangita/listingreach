/**
 * Interface for User Business Logic */

import BaseBusiness = require("./../BaseBusiness");
import IAgentModel = require("./../../model/interfaces/IAgentModel");

interface IAgentBusiness extends BaseBusiness<IAgentModel> {

}
export = IAgentBusiness;
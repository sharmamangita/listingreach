/**
 * Interface for User Business Logic */

import BaseBusiness = require("./../BaseBusiness");
import IAgentTemplateModel = require("./../../model/interfaces/IAgentTemplateModel");

interface IAgentTemplateBusiness extends BaseBusiness<IAgentTemplateModel> {

}
export = IAgentTemplateBusiness;
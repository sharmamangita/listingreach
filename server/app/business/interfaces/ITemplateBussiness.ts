/**
 * Interface for User Business Logic */

import BaseBusiness = require("./../BaseBusiness");
import ITemplate = require("./../../model/interfaces/ITemplateModel");

interface ITemplateBusiness extends BaseBusiness<ITemplateModel> {

}
export = ITemplateBusiness;
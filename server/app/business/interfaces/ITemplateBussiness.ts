/**
 * Interface for User Business Logic */

import BaseBusiness = require("./../BaseBusiness");
import ITemplateModel = require("./../../model/interfaces/ITemplateModel");

interface ITemplateBusiness extends BaseBusiness<ITemplateModel> {

}
export = ITemplateBusiness;
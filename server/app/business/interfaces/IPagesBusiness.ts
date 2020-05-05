/**
 * Interface for User Business Logic */

import BaseBusiness = require("./../BaseBusiness");
import IPagesBusiness = require("./../../model/interfaces/IPagesBusiness");

interface IPagesBusiness extends BaseBusiness<IPagesBusiness> {

}
export = IPagesBusiness;
/**
 * Interface for User Business Logic */

import BaseBusiness = require("./../BaseBusiness");
import IPostreviewBusiness = require("./../../model/interfaces/IPostreviewBusiness");

interface IPostreviewBusiness extends BaseBusiness<IPostreviewBusiness> {

}
export = IPostreviewBusiness;
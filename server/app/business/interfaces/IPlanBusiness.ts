/**
 * Interface for User Business Logic */

import BaseBusiness = require("./../BaseBusiness");
import IPlanBusiness = require("./../../model/interfaces/IPlanBusiness");

interface IUserBusiness extends BaseBusiness<IPlanBusiness> {

}
export = IPlanBusiness;
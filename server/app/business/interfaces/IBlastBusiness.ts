/**
 * Interface for User Business Logic */

import BaseBusiness = require("./../BaseBusiness");
import IBlastModel = require("./../../model/interfaces/IBlastModel");

interface IBlastBusiness extends BaseBusiness<IBlastModel> {

}
export = IBlastBusiness;
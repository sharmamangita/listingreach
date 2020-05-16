/**
 * Interface for User Business Logic */

import BaseBusiness = require("./../BaseBusiness");
import IBlastImageModel = require("./../../model/interfaces/IBlastImageModel");

interface IBlastImageBusiness extends BaseBusiness<IBlastImageModel> {

}
export = IBlastImageBusiness;

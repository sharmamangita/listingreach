/**
 * Interface for User Business Logic */

import BaseBusiness = require("./../BaseBusiness");
import IAdminUserModel = require("./../../model/interfaces/IAdminUserModel");

interface IAdminUserBusiness extends BaseBusiness<IAdminUserModel> {

}
export = IAdminUserBusiness;
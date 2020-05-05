/**
 * Interface for User Business Logic */

import BaseBusiness = require("./../BaseBusiness");
import IUserModel = require("./../../model/interfaces/IUserModel");

interface IUserBusiness extends BaseBusiness<IUserModel> {

}
export = IUserBusiness;
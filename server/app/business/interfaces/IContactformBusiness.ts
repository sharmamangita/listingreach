/**
 * Interface for User Business Logic */

import BaseBusiness = require("./../BaseBusiness");
import IContacformModel = require("./../../model/interfaces/IContactformModel");

interface IContactformBusiness extends BaseBusiness<IContactformModel> {

}
export = IContactformBusiness;

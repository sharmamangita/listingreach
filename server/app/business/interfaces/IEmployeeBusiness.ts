/**
 * Interface for Employee Business Logic */

import BaseBusiness = require("./../BaseBusiness");
import IEmployeeModel = require("./../../model/interfaces/IEmployeeModel");

interface IEmployeeBusiness extends BaseBusiness<IEmployeeModel> {

}
export = IEmployeeBusiness;
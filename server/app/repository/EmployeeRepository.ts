/**
 * Employee model repository
 */

import EmployeeModel = require("./../model/EmployeeModel");
import IEmployeeModel = require("./../model/interfaces/IEmployeeModel");
import EmployeeSchema = require("./../dataAccess/schemas/EmployeeSchema");
import RepositoryBase = require("./BaseRepository");

class EmployeeRepository  extends RepositoryBase<IEmployeeModel> {
    constructor () {
        super(EmployeeSchema);
    }
}

Object.seal(EmployeeRepository);
export = EmployeeRepository;
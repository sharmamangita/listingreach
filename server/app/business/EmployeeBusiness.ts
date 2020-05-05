/**
 * Business Logic for EmployeBusiness, called from the Controllers
 */

import mongoose = require("mongoose");

import EmployeeRepository = require("./../repository/EmployeeRepository");
import IEmployeeBusiness = require("./interfaces/IEmployeeBusiness");
import IEmployeeModel = require("./../model/interfaces/IEmployeeModel");
import EmployeeModel = require("./../model/EmployeeModel");


class EmployeeBusiness implements IEmployeeBusiness {
    private _employeeRepository: EmployeeRepository;

    constructor () {
        this._employeeRepository = new EmployeeRepository();
    }

    create (item: IEmployeeModel, callback: (error: any, result: any) => void) {
        item._id=mongoose.Types.ObjectId();
        this._employeeRepository.create(item, callback);
    }

    aggregate (query: any, callback: (error: any, result: any) => void) {
        this._employeeRepository.aggregate(query, callback);
    }

    retrieve (query: any,callback: (error: any, result: any) => void) {
        this._employeeRepository.retrieve(query,callback);
    }
	
	retrieveFields (query: any, fields: any, callback: (error: any, result: any) => void) {
        this._employeeRepository.retrieveFields(query, fields,callback);
    }

    update (_id: string, item: IEmployeeModel, callback: (error: any, result: any) => void) {

        this._employeeRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);

            else
                this._employeeRepository.update(res._id, item, callback);

        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._employeeRepository.delete(_id , callback);
    }
    deleteMany (query: any, callback:(error: any, result: any) => void) {
        this._employeeRepository.deleteMany(query , callback);
    }

    findById (_id: any, callback: (error: any, result: IEmployeeModel) => void) {
        this._employeeRepository.findById(_id, callback);
    }

    findOne (query: any, callback: (error: any, result: IEmployeeModel) => void) {
        this._employeeRepository.findOne(query, callback);
    }

    count (query: any, callback: (error: any, result: Number) => void) {
        this._employeeRepository.count(query, callback);
    }

}


Object.seal(EmployeeBusiness);
export = EmployeeBusiness;
/**
 * User model
 */
import mongoose = require("mongoose");

import IPlanModel = require('./interfaces/IUserModel');

class PlanModel {

    private _palnModel : IPlanModel;

    constructor(PlanModel: IPlanModel) {
        this._planModel = PlanModel;
    }
    get _id (): mongoose.Types.ObjectId {
        return this._planModel._id;
    }
    get plan (): string {
        return this._planModel.plan;
    }
    get plan_name():string{
        return this._palnModel.plan_name;
    }
    get experience_one (): object {
        return this._planModel.experience_one;
    }
    get experience_two (): object {
        return this._planModel.experience_two;
    }
    get experience_three (): object {
        return this._planModel.experience_three;
    }
    get createdOn (): Date {
        return this._planModel.createdOn;
    }
    
	
}
Object.seal(PlanModel);
export =  PlanModel;


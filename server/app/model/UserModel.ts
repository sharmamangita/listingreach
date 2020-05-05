/**
 * User model
 */
import mongoose = require("mongoose");

import IUserModel = require('./interfaces/IUserModel');

class UserModel {

    private _userModel : IUserModel;

    constructor(UserModel: IUserModel) {
        this._userModel = UserModel;
    }
    get _id (): mongoose.Types.ObjectId {
        return this._userModel._id;
    }
    get firstName (): string {
        return this._userModel.firstName;
    }
    get lastName (): string {
        return this._userModel.lastName;
    }
    get middleName (): string {
        return this._userModel.middleName;
    }
    get email (): string {
        return this._userModel.email;
    }
    get password (): string {
        return this._userModel.password;
    }
   
    get companyName (): string {
        return this._userModel.companyName;
    }
    get previouscompanyName():string{
        return this._userModel.previouscompanyName;
    }
    get roles (): string {
        return this._userModel.roles;
    }

	get lastLogin (): Date {
        return this._userModel.lastLogin;
    }
    
	get token (): string {
        return this._userModel.token;
    }
    get status (): string {
        return this._userModel.status;
    }
	get paidExpirydate() :Date{
        return this._userModel.paidExpirydate;
    } 
    get paidOn() :Boolean{
        return this._userModel.paidOn;
    }
    get hrpaidOn() :Boolean{
        return this._userModel.hrpaidOn;
    }
    get amount() :string{
        return this._userModel.amount;
    }
    get linkdinId() :string{
        return this._userModel.linkdinId;
    }
    get createdOn (): Date {
        return this._userModel.createdOn;
    }
    
	
}
Object.seal(UserModel);
export =  UserModel;


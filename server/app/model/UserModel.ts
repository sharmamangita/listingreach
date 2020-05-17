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
    get paidOn (): string {
        return this._userModel.paidOn;
    }
    get userName (): string {
        return this._userModel.userName;
    }
    
    get companyName (): string {
        return this._userModel.companyName;
    }
    get phone (): string {
        return this._userModel.phone;
    }
    get city (): string {
        return this._userModel.city;
    }
    get zipcode (): string {
        return this._userModel.zipcode;
    }
   	
    get country (): string {
        return this._userModel.country;
    }
    get state (): string {
        return this._userModel.state;
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
	
    get createdOn (): Date {
        return this._userModel.createdOn;
    }
    
	
}
Object.seal(UserModel);
export =  UserModel;


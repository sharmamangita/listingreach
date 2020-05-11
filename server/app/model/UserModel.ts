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
    
	get lastLogin (): Date {
        return this._userModel.lastLogin;
    }
     get roles (): string {
        return this._userModel.roles;
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


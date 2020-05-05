/**
 * User model
 */
import mongoose = require("mongoose");

import IAdminUserModel = require('./interfaces/IAdminUserModel');

class AdminUserModel {

    private _userModel : IAdminUserModel;

    constructor(AdminUserModel: IAdminUserModel) {
        this._userModel = AdminUserModel;
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
    get email (): string {
        return this._userModel.email;
    }
    get password (): string {
        return this._userModel.password;
    }
	get lastLogin (): Date {
        return this._userModel.lastLogin;
    }
	get token (): string {
        return this._userModel.token;
    }
	get isActive (): boolean {
        return this._userModel.isActive;
    }
	
}
Object.seal(AdminUserModel);
export =  AdminUserModel;


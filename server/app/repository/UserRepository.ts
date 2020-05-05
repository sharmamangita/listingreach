/**
 * application model repository
 */

import UserSchema = require("./../dataAccess/schemas/UserSchema");
import RepositoryBase = require("./BaseRepository");
import IUserModel = require("./../model/interfaces/IUserModel");

class UserRepository  extends RepositoryBase<IUserModel> {
    constructor () {
        super(UserSchema);
    }
	

}

Object.seal(UserRepository);
export = UserRepository;
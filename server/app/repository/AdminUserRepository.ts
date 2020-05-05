/**
 * application model repository
 */

import AdminUserSchema = require("./../dataAccess/schemas/AdminUserSchema");
import RepositoryBase = require("./BaseRepository");
import IAdminUserModel = require("./../model/interfaces/IAdminUserModel");

class AdminUserRepository  extends RepositoryBase<IAdminUserModel> {
    constructor () {
        super(AdminUserSchema);
    }
	

}

Object.seal(AdminUserRepository);
export = AdminUserRepository;
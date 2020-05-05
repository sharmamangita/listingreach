/**
 * application model repository
 */

import ContactformSchema = require("./../dataAccess/schemas/ContactformSchema");
import RepositoryBase = require("./BaseRepository");
import IContactformModel = require("./../model/interfaces/IContactformModel");

class ContactformRepository  extends RepositoryBase<IContactformModel> {
    constructor () {
        super(ContactformSchema);
    }
	

}

Object.seal(ContactformRepository);
export = ContactformRepository;

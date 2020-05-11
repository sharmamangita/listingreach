/**
 * application model repository
 */

import PagesSchema = require("./../dataAccess/schemas/PagesSchema");
import RepositoryBase = require("./BaseRepository");
import IPagesModel = require("./../model/interfaces/IPagesModel");

class PagesRepository  extends RepositoryBase<IPagesModel> {
    constructor () {
        super(PagesSchema);
    }
	

}

Object.seal(PagesRepository);
export = PagesRepository;
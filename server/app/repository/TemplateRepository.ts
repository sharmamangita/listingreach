/**
 * application model repository
 */

import TemplateSchema = require("./../dataAccess/schemas/TemplateSchema");
import RepositoryBase = require("./BaseRepository");
import ITemplateModel = require("./../model/interfaces/ITemplateModel");

class TemplateSchema  extends RepositoryBase<ITemplateModel> {
    constructor () {
        super(TemplateSchema);
    }
	

}

Object.seal(TemplateSchema);
export = TemplateSchema;
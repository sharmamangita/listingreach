/**
 * application model repository
 */

import PropertySchema = require("./../dataAccess/schemas/PropertySchema");
import RepositoryBase = require("./BaseRepository");
import IPropertyModel = require("./../model/interfaces/IPropertyModel");

class PropertyRepository  extends RepositoryBase<IPropertyModel> {
    constructor () {
        super(PropertySchema);
    }
	

}

Object.seal(PropertyRepository);
export = PropertyRepository;
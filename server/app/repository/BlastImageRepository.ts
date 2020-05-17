/**
 * application model repository
 */

import BlastImageSchema = require("./../dataAccess/schemas/BlastImageSchema");
import RepositoryBase = require("./BaseRepository");
import IBlastImageModel = require("./../model/interfaces/IBlastImageModel");

class BlastImageRepository  extends RepositoryBase<IBlastImageModel> {
    constructor () {
        super(BlastImageSchema);
    }
	

}

Object.seal(BlastImageRepository);
export = BlastImageRepository;
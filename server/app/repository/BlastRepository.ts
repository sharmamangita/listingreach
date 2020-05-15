/**
 * application model repository
 */

import BlastSchema = require("./../dataAccess/schemas/BlastSchema");
import RepositoryBase = require("./BaseRepository");
import IBlastModel = require("./../model/interfaces/IBlastModel");

class BlastRepository  extends RepositoryBase<IBlastModel> {
    constructor () {
        super(BlastSchema);
    }
	

}

Object.seal(BlastRepository);
export = BlastRepository;
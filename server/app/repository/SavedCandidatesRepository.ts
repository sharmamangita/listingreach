/**
 * application model repository
 */

import SavedCandidatesSchema = require("./../dataAccess/schemas/SavedCandidatesSchema");
import RepositoryBase = require("./BaseRepository");
import ISavedCandidatesModel = require("./../model/interfaces/ISavedCandidatesModel");

class SavedCandidatesRepository  extends RepositoryBase<ISavedCandidatesModel> {
    constructor () {
        super(SavedCandidatesSchema);
    }
	

}

Object.seal(SavedCandidatesRepository);
export = SavedCandidatesRepository;
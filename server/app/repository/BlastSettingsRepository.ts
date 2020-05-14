/**
 * application model repository
 */

import BlastSettingsSchema = require("./../dataAccess/schemas/BlastSettingsSchema");
import RepositoryBase = require("./BaseRepository");
import IBlastSettingsModel = require("./../model/interfaces/IBlastSettingsModel");

class BlastSettingsRepository  extends RepositoryBase<IBlastSettingsModel> {
    constructor () {
        super(BlastSettingsSchema);
    }
	

}

Object.seal(BlastSettingsRepository);
export = BlastSettingsRepository;
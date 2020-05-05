/**
 * application model repository
 */

import PlanSchema = require("./../dataAccess/schemas/PlanSchema");
import RepositoryBase = require("./BaseRepository");
import IPlanModel = require("./../model/interfaces/IPlanModel");

class PlanRepository  extends RepositoryBase<IPlanModel> {
    constructor () {
        super(PlanSchema);
    }
	

}

Object.seal(PlanRepository);
export = PlanRepository;
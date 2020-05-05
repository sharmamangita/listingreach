/**
 * Interface for User Business Logic */

import BaseBusiness = require("./../BaseBusiness");
import ISavedCandidatesModel = require("./../../model/interfaces/ISavedCandidatesModel");

interface ISavedCandidateBusiness extends BaseBusiness<ISavedCandidatesModel> {

}
export = ISavedCandidateBusiness;
/**
 * Interface for User Business Logic */

import BaseBusiness = require("./../BaseBusiness");
import IInvitationModel = require("./../../model/interfaces/IInvitationModel");

interface IInvitationBusiness extends BaseBusiness<IInvitationModel> {

}
export = IInvitationBusiness;

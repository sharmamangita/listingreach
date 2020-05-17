/**
 * Interface for User Business Logic */

import BaseBusiness = require("../BaseBusiness");
import ISubscriberModel = require("../../model/interfaces/ISubscriberModel");
interface ISubscriberBusiness extends BaseBusiness<ISubscriberModel> {
}
export = ISubscriberBusiness;
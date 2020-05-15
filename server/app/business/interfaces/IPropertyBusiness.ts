/**
 * Interface for User Business Logic */

import BaseBusiness = require("./../BaseBusiness");
import IPropertyModel = require("./../../model/interfaces/IPropertyModel");

interface IPropertyBusiness extends BaseBusiness<IPropertyModel> {

}
export = IPropertyBusiness;
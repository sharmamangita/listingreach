/**
 * Address Model used by other models like AddressModel
 */
import IProfessionalModel = require('./interfaces/IProfessionalModel');

class ProfessionalModel {

    private _ProfessionalModel: IProfessionalModel;

    constructor(ProfessionalModel: IProfessionalModel) {
        this._ProfessionalModel = ProfessionalModel;
    }
    get company_name (): string {
        return this._ProfessionalModel.company_name;
    }
    get technology (): string {
        return this._ProfessionalModel.technology;
    }
    get department (): string {
        return this._ProfessionalModel.department;
    }
    get duration (): Date {
        return this._ProfessionalModel.duration;
    }
    get project_details (): string {
        return this._ProfessionalModel.project_details;
    }
    
}
Object.seal(ProfessionalModel);
export =  ProfessionalModel;
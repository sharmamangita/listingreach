/**
 * Address Model used by other models like AddressModel
 */
import IAddressModel = require('./interfaces/IAddressModel');

class AddressModel {

    private _AddressModel: IAddressModel;

    constructor(AddressModel: IAddressModel) {
        this._AddressModel = AddressModel;
    }
    get street (): string {
        return this._AddressModel.street;
    }
    get building (): string {
        return this._AddressModel.building;
    }
    get city (): string {
        return this._AddressModel.city;
    }
    get state (): string {
        return this._AddressModel.state;
    }
    get country (): string {
        return this._AddressModel.country;
    }

    get timezone (): string {
        return this._AddressModel.timezone;
    }

    get postCode (): string {
        return this._AddressModel.postCode;
    }
    
}
Object.seal(AddressModel);
export =  AddressModel;
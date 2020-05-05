/**
 * Address Model used by other models like AddressModel
 */
import ContactformModel = require('./interfaces/IContactformModel');

class ContactformModel {

    private _ContactformPage: ContactModel;

    constructor(ContactformModel: ContactformModel) {
        this._ContactformModel = ContactformModel;
    }
    
    get fullname (): string {
        return this._ContactformModel.fullname;
    }
    
    get email (): string {
        return this._ContactformModel.email;
    }
    
    get phone (): string {
        return this._ContactformModel.phone;
    }
    
    get message (): string {
        return this._ContactformModel.message;
    }
   
   get createdOn (): Date {
        return this._ContactformModel.createdOn;
    }
    
}
Object.seal(ContactformModel);
export =  ContactformModel;

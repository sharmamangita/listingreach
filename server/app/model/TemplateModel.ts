/**
 * User model
 */
import mongoose = require("mongoose");

import ITemplateModel = require('./interfaces/IUserModel');

class TemplateModel {

    private _templateModel : ITemplateModel;

    constructor(UserModel: ITemplateModel) {
        this._templateModel = TemplateModel;
    }
    get _id (): mongoose.Types.ObjectId {
        return this._templateModel._id;
    }

    get template_type (): string {
        return this._templateModel.template_type;
    }
    get email_subject (): string {
        return this._templateModel.email_subject;
    }
    get from_line (): string {
        return this._templateModel.from_line;
    }
    get address (): string {
        return this._templateModel.address;
    }
    get headline (): string {
        return this._templateModel.headline;
    }
    get database_id (): string {
        return this._templateModel.database_id;
    }
    get template_date (): string {
        return this._templateModel.template_date;
    }
    
	get paid (): Date {
        return this._templateModel.paid;
    }
     get image_id (): mongoose.Types.ObjectId {
        return this._templateModel.image_id;
    }

	get status (): string {
        return this._templateModel.status;
    }
    get Property_id (): mongoose.Types.ObjectId {
        return this._templateModel.Property_id;
    }
	
    get created_on (): Date {
        return this._templateModel.created_on;
    }
    
	
}
Object.seal(TemplateModel);
export =  TemplateModel;


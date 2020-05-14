/**
 * User model
 */
import mongoose = require("mongoose");

import IBlastSettingsModel = require('./interfaces/IBlastSettingsModel');

class BlastSettingsModel {

    private _blastSettingModel : IBlastSettingsModel;

    constructor(blastSettingModel: IBlastSettingsModel) {
        this._blastSettingModel = blastSettingModel;
    }
    get _id (): mongoose.Types.ObjectId {
        return this._blastSettingModel._id;
    }
    get per_email_blast_price (): mongoose.Types.Decimal128 {
        return this._blastSettingModel.per_email_blast_price;
    }
    get additional_email_blast_price():mongoose.Types.Decimal128{
        return this._blastSettingModel.additional_email_blast_price;
    }
 
    get modifiedOn (): Date {
        return this._blastSettingModel.modifiedOn;
    }
    
	
}
Object.seal(BlastSettingsModel);
export =  BlastSettingsModel;


/**
 * User model
 */
import mongoose = require("mongoose");

import IBlastModel = require('./interfaces/IBlastModel');
class BlastModel {

    private _blastModel : IBlastModel;

    constructor(BlastModel: IBlastModel) {
        this._blastModel = BlastModel;
    }
    get _id (): mongoose.Types.ObjectId {
        return this._blastModel._id;
    }

    get user_id (): mongoose.Types.ObjectId {
        return this._blastModel.user_id;
    }
    get blast_type (): string {
        return this._blastModel.blast_type;
    }
    get selected_template_id (): string {
        return this._blastModel.selected_template_id;
    }
    get selected_template_date (): string {
        return this._blastModel.selected_template_id;
    }
	
}
Object.seal(BlastModel);
export =  BlastModel;


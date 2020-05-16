/**
 * User model
 */
import mongoose = require("mongoose");

import IBlastImageModel = require('./interfaces/IBlastImageModel');
class BlastImageModel {

    private _blastImageModel : IBlastImageModel;

    constructor(BlastImageModel: IBlastImageModel) {
        this._blastImageModel = BlastImageModel;
    }
    get _id (): mongoose.Types.ObjectId {
        return this._blastImageModel._id;
    }

    get user_id (): mongoose.Types.ObjectId {
        return this._blastImageModel.user_id;
    }
    get url (): string {
        return this._blastImageModel.blast_type;
    }
	
}
Object.seal(BlastImageModel);
export =  BlastImageModel;

/**
 * User model
 */
import mongoose = require("mongoose");

import ISavedCandidatesModel = require('./interfaces/ISavedCandidatesModel');

class SavedCandidatesModel {

    private _savedCandidatesModel : ISavedCandidatesModel;

    constructor(InvitationModel: ISavedCandidatesModel) {
        this._savedCandidatesModel = InvitationModel;
    }
    get _id (): mongoose.Types.ObjectId {
        return this._savedCandidatesModel._id;
    }
    get user_id (): string {
        return this._savedCandidatesModel.user_id;
    }
    get candidate_id (): string {
        return this._savedCandidatesModel.candidate_id;
    }
    get saved (): string {
        return this._savedCandidatesModel.saved;
    }
    get downloaded (): string {
        return this._savedCandidatesModel.downloaded;
    }
    get viewed():string {
         return this._savedCandidatesModel.viewed;
    }
    get paidOn() :Boolean{
        return this._savedCandidatesModel.paidOn;
    }
    get amount() :string{
        return this._savedCandidatesModel.amount;
    }
    get createdOn (): Date {
        return this._savedCandidatesModel.createdOn;
    }
}
Object.seal(SavedCandidatesModel);
export =  SavedCandidatesModel;


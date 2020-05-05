/**
 * Pages model
 */
import mongoose = require("mongoose");

import IPagesModel = require('./interfaces/IPagesModel');

class PostreviewModel {

    private _postreviewModel : IPostreviewModel;

    constructor(PostreviewModel: IPostreviewModel) {
        this._postreviewModel = PostreviewModel;
    }
    get _id (): mongoose.Types.ObjectId {
        return this._postreviewModel._id;
    }
    get fullname (): string {
        return this._postreviewModel.fullname;
    }
    get email (): string {
        return this._postreviewModel.email;
    }
    get company (): string {
        return this._postreviewModel.company;
    }
    get candidatereport (): string {
        return this._postreviewModel.candidatereport;
    }
    get communication (): string {
        return this._postreviewModel.communication;
    }
    get ownership (): string {
        return this._postreviewModel.ownership;
    }
    get selfdrive (): string {
        return this._postreviewModel.selfdrive;
    }
    get technicalexp (): string {
        return this._postreviewModel.technicalexp;
    }
    get strengths (): string {
        return this._postreviewModel.strengths;
    }
    get improvment (): string {
        return this._postreviewModel.improvment;
    }
    get overall (): string {
        return this._postreviewModel.overall;
    }
    get status (): string {
        return this._postreviewModel.status;
    }
    get userId (): string {
        return this._postreviewModel.userId;
    }


    get createdOn (): Date {
        return this._postreviewModel.createdOn;
    }
    

}
Object.seal(PostreviewModel);
export =  PostreviewModel;


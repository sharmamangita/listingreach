/**
 * Pages model
 */
import mongoose = require("mongoose");

import IPagesModel = require('./interfaces/IPagesModel');

class PagesModel {

    private _pagesModel : IPagesModel;

    constructor(PagesModel: IPagesModel) {
        this._pagesModel = PagesModel;
    }
    get _id (): mongoose.Types.ObjectId {
        return this._pagesModel._id;
    }
    get page (): string {
        return this._pagesModel.page;
    }
    get content (): string {
        return this._pagesModel.content;
    }
}
Object.seal(PagesModel);
export =  PagesModel;


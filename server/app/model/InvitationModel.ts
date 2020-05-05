/**
 * User model
 */
import mongoose = require("mongoose");

import IInvitationModel = require('./interfaces/IInvitationModel');

class InvitationModel {

    private _invitationModel : IInvitationModel;

    constructor(InvitationModel: IInvitationModel) {
        this._invitationModel = InvitationModel;
    }
    get _id (): mongoose.Types.ObjectId {
        return this.invitationModel._id;
    }
    get fullName (): string {
        return this.invitationModel.fullName;
    }

    get email (): string {
        return this.invitationModel.email;
    }
    get userid (): string {
        return this.invitationModel.userid;
    }
   
    get status (): string {
        return this.invitationModel.status;
    }
    get linkdinId (): string {
        return this.invitationModel.linkdinId;
    }

	get websiteref (): string {
        return this.invitationModel.websiteref;
    }

    get token (): string {
        return this.invitationModel.token;
    }

    get createdOn (): Date {
        return this._userModel.createdOn;
    }
    
	
}
Object.seal(InvitationModel);
export =  InvitationModel;


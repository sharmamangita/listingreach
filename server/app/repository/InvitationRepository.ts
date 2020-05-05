/**
 * application model repository
 */

import InvitationSchema = require("./../dataAccess/schemas/InvitationSchema");
import RepositoryBase = require("./BaseRepository");
import IInvitationModel = require("./../model/interfaces/IInvitationModel");

class InvitationRepository  extends RepositoryBase<IInvitationModel> {
    constructor () {
        super(InvitationSchema);
    }
	
}

Object.seal(InvitationRepository);
export = InvitationRepository;

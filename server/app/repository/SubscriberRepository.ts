/**
 * application model repository
 */

import SubscriberSchema = require("../dataAccess/schemas/SubscriberSchema");
import RepositoryBase = require("./BaseRepository");
import ISubscriberModel = require("../model/interfaces/ISubscriberModel");

class SubscriberRepository  extends RepositoryBase<ISubscriberModel> {
    constructor () {
        super(SubscriberSchema);
    }
	

}

Object.seal(SubscriberRepository);
export = SubscriberRepository;
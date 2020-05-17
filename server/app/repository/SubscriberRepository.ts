/**
 * application model repository
 */

import SubscriberSchena = require("../dataAccess/schemas/SubscriberSchena");
import RepositoryBase = require("./BaseRepository");
import ISubscriberModel = require("../model/interfaces/ISubscriberModel");

class SubscriberRepository  extends RepositoryBase<ISubscriberModel> {
    constructor () {
        super(SubscriberSchena);
    }
	

}

Object.seal(SubscriberRepository);
export = SubscriberRepository;
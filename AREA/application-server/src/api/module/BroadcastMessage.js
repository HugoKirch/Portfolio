const AreaCall = require("../reaction");
const {v4: uuidv4} = require("uuid");

class BroadcastMessage extends AreaCall {
    _broadcastContent;
    _userUUID;

    constructor(broadcastContent, userUUID) {
        super("BC Message", "Trigger Action",  userUUID, uuidv4(), 0);
        this._broadcastContent = broadcastContent;
        this._userUUID = userUUID;
    }

    setup() {
        // this.loop(5);
    }

    execute(content) {
        console.log(`==== { BC API } ====`);
        console.log(`${this._broadcastContent} | Message: ${content}`);
        console.log(`==== { BC API } ====`);
    }

    loopExecute() {
        console.log("DEBUG");
    }

    exportConfigValue() {
        return [this._broadcastContent, this._userUUID];
    }

}

module.exports = BroadcastMessage;
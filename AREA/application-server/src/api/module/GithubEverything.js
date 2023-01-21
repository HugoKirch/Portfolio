const AreaCall = require("../reaction");
const { v4: uuidv4 } = require('uuid');

class GithubEverything extends AreaCall {

    _urlWebhook;
    _userUUID;

    constructor(userUUID) {
        super("GithubEverything", "GithubEverything Action", userUUID, uuidv4(), 4);
        this._urlWebhook = "/github" + uuidv4();
        this._userUUID = userUUID;
    }

    setup() {
        appGlobal.post(this._urlWebhook, (request, response) => {
            if (this._destruct === true) return;
            this.preExecute("New action on your GitHub Repository");
        })
    }

    execute(content) {

    }

    loopExecute() {
        this.preExecute();
    }

    exportConfigValue() {
        return [this._urlWebhook, this._userUUID];
    }
}

module.exports = GithubEverything;
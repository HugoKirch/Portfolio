const AreaCall = require("../reaction");
const { v4: uuidv4 } = require('uuid');

class GitlabEverything extends AreaCall {

    _urlWebhook;
    _userUUID;

    constructor(userUUID) {
        super("GitlabEverything", "GitlabEverything Action", userUUID, uuidv4(), 5);
        this._urlWebhook = "/gitlab" + uuidv4();
        this._userUUID = userUUID;
    }

    setup() {
        appGlobal.post(this._urlWebhook, (request, response) => {
            if (this._destruct === true) return;
            this.preExecute("New action on your GitLab Repository");
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

module.exports = GitlabEverything;
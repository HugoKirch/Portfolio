
class AreaCall {
    _name
    _description
    _id
    _linkUUID
    _userLinkUUID
    _destruct

    constructor(name, description, userLinkUUID="-1", linkUUID, id, destruct=false) {
        this._name = name;
        this._description = description;
        this._id = id;
        this._linkUUID = linkUUID;
        this._userLinkUUID = userLinkUUID;
        this._destruct = destruct;
    }
    preExecute (content="") {
        let user = userManager.getUser(this._userLinkUUID);
        if (user === undefined) return;
        let tmpLinkUUID = user.linked.get(this._linkUUID);
        if (tmpLinkUUID === undefined) return;
        for (let react of user.reaction) {
            let offReact = linkManager.factoryManager(react);
            if (offReact.linkUUID === tmpLinkUUID) offReact.execute(content);
        }
    }
    execute(content) {}
    setup() { }
    loopExecute() { }
    loop(delay) {
        this.loopExecute();
        setInterval(() => {
            if (this._destruct === true) return;
            this.loopExecute();
        }, 1000*delay);
    }

    destruct_execute() {
        this._destruct = true;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get id() {
        return this._id;
    }

    get linkUUID() {
        return this._linkUUID;
    }

    get userLinkUUID() {
        return this._userLinkUUID;
    }

    get destruct() {
        return this._destruct;
    }

    exportConfigValue() { }
}
module.exports = AreaCall;
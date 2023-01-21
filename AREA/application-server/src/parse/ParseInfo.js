class ParseInfo {
    _actionUUID
    _actionID
    _actionSavedValue;
    _reactionUUID
    _reactionID
    _reactionSavedValue;

    constructor(actionUUID, actionID, actionList, reactionUUID, reactionID, reactionList) {
        this._reactionUUID = reactionUUID;
        this._reactionID = reactionID;
        this._reactionSavedValue = reactionList;

        this._actionUUID = actionUUID;
        this._actionID = actionID;
        this._actionSavedValue = actionList;
    }


    get actionUUID() {
        return this._actionUUID;
    }

    get actionID() {
        return this._actionID;
    }

    get reactionUUID() {
        return this._reactionUUID;
    }

    get reactionID() {
        return this._reactionID;
    }

    get actionSavedValue() {
        return this._actionSavedValue;
    }

    get reactionSavedValue() {
        return this._reactionSavedValue;
    }
}

module.exports = ParseInfo;
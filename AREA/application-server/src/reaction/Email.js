const REAction = require("../abstract/REAction.js")

class Email extends REAction {

    constructor(config) {
        super("", "", 1, config);
    }

    execute() {
        // let json = Object.fromEntries(this._config);
        // let map = new Map(Object.entries(json))
        for (let key of this._config.keys()) {
            const value = this._config.get(key);
            console.log(`${key}: ${value}`)
        }
    }
}

module.exports = Email;
const md5 = require("md5");
const security = require("../security/Security.js")
const { v4: uuidv4 } = require('uuid');

class User {

    _uuid;
    _username;
    _password;

    _email;

    _reaction;
    _action;
    _linked;

    constructor(username, password, email, uuid=uuidv4(), reaction=[], action=[], linked=new Map(), hash=true) {
        this._username = username;
        if (hash === true) this._password = security.areaHashPassword(password);
        else this._password = password;
        this._email = email;
        this._uuid = uuid;
        this._reaction = reaction;
        this._action = action;
        this._linked = linked;
    }

    get uuid() {
        return this._uuid;
    }

    get username() {
        return this._username;
    }

    get password() {
        return this._password;
    }

    get email() {
        return this._email;
    }


    get reaction() {
        return this._reaction;
    }

    get action() {
        return this._action;
    }

    get linked() {
        return this._linked;
    }

    setPassword(value) {
        this._password = security.areaHashPassword(value);
    }

    mysqlValues() {
        return [`${this._uuid}`, `${this._username}`, `${this._password}`, `${this._email}`, `${areaParser.fromListToParse(this._action)}`, `${areaParser.fromListToParse(this._reaction)}`, `${JSON.stringify(Object.fromEntries(this.linked))}`];
    }
}
module.exports = User;
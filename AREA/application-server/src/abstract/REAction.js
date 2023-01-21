class REAction {

    _name;
    _description;
    _id;
    _config;

    constructor(name, description, id, config) {
        this._name = name;
        this._description = description;
        this._id = id;
        this._config = config;
    }

    execute() { }

}
module.exports = REAction;
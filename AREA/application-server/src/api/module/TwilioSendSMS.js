const AreaCall = require("../reaction");
const { v4: uuidv4 } = require('uuid');
const fetch = require("node-fetch");
const axios = require('axios');

class TwilioSendSMS extends AreaCall {

    _token1;
    _token2;
    _fromnb;
    _tonb;
    _userUUID;
    _body;

    constructor(token1, token2, fromnb, tonb, body, userUUID) {
        super("TwilioSendSMS", "TwilioSendSMS Action", userUUID, uuidv4(), 17);
        this._token1 = token1;
        this._token2 = token2;
        this._fromnb = fromnb;
        this._tonb = tonb;
        this._body = body;
        this._userUUID = userUUID;
    }

    setup() {
    }

    execute(content) {
        const client = require('twilio')(this._token1, this._token2);
        client.messages.create({
            body: content + " - "  + this._body,
            from: this._tofrom,
            to: this._tonb
        }).then().catch(err => console.log(err))
    }

    loopExecute() {
    }

    exportConfigValue() {
        return [this._token1, this._token2, this._fromnb, this._tonb, this._body, this._userUUID];
    }
}

module.exports = TwilioSendSMS;
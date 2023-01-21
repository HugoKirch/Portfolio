const AreaCall = require("../reaction");
const { v4: uuidv4 } = require('uuid');
const fetch = require("node-fetch");
const axios = require('axios');
const express = require('express');
const { MessagingResponse } = require('twilio').twiml;

class TwilioReceiveSMS extends AreaCall {

    _msghook;
    _urlWebhook;
    _userUUID;

    constructor(msgHook, userUUID) {
        super("TwilioReceiveSMS", "TwilioReceiveSMS Action", userUUID, uuidv4(), 10);
        this._msghook = msgHook;
        this._urlWebhook = '/TwilioReceiveSMS' + uuidv4();
        this._userUUID = userUUID;
    }

    setup() {
        appGlobal.post(this._urlWebhook, (request, response) => {
            if (this._destruct === true) return;
            const twiml = new MessagingResponse();
            twiml.message(this._msghook);
            res.type('text/xml').send(twiml.toString());
            this.preExecute("The message '" + this._msghook + "' has been hooked !");
        })
    }

    execute(content) {

    }

    loopExecute() {

    }

    exportConfigValue() {
        return [this._msghook, this._urlWebhook, this._userUUID];
    }
}

module.exports = TwilioReceiveSMS;
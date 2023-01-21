const AreaCall = require("../reaction");
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const { v4: uuidv4 } = require('uuid');

const axios = require('axios').default

class DiscordPostMessage extends AreaCall {

    _username;
    _body;
    _token;
    _userUUID;

    constructor(username, body, token, userUUID) {
        super("DiscordPostMessage", "DiscordPostMessage trigger action",  userUUID, uuidv4(), 19);
        this._token = token;
        this._username = username;
        this._body = body;
        this._userUUID = userUUID;
    }

    setup() {
    }

    execute(content) {
        axios({
            method: 'post',
            url: this._token,
            data: {
                username: this.username,
                content: content + " - " + this._body,
            },
        })
    }

    exportConfigValue() {
        return [this._username, this._body, this._token, this._userUUID];
    }

}

module.exports = DiscordPostMessage;
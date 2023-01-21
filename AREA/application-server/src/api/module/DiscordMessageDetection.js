const AreaCall = require("../reaction");
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const { v4: uuidv4 } = require('uuid');

class DiscordMessageDetection extends AreaCall {

    _token
    _triggerWord
    _userUUID;

    constructor(token, triggerWord, userUUID) {
        super("DiscordMessageDetection", "DiscordMessageDetection trigger action",  userUUID, uuidv4(), 16);
        this._triggerWord = triggerWord;
        this._token = token;
        this._userUUID = userUUID;
    }

    setup() {
        client.login(this._token);

        client.on('messageCreate', async message => {
            if (this._destruct === true) return;
            if (message.author.bot) return;
            this.preExecute(message.content);
        });
    }

    exportConfigValue() {
        return [this._token, this._triggerWord, this._userUUID];
    }

}

module.exports = DiscordMessageDetection;
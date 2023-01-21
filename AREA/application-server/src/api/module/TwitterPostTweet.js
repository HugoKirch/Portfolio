const AreaCall = require("../reaction");
const { v4: uuidv4 } = require('uuid');
const fetch = require("node-fetch");
const axios = require("axios");

class TwitterPostTweet extends AreaCall {

    _appKey;
    _appSecret;
    _accessToken;
    _accessSecret;
    _body;
    _userUUID;

    constructor(appKey, appSecret, accessToken, accessSecret, body, userUUID) {
        super("TwitterPostTweet", "TwitterPostTweet Action", userUUID, uuidv4(), 18);
        this._appKey = appKey;
        this._appSecret = appSecret;
        this._accessToken = accessToken;
        this._accessSecret = accessSecret;
        this._body = body;
        this._userUUID = userUUID;
    }

    setup() {
    }

    execute(content) {
        const {TwitterApi} = require('twitter-api-v2')
        const client = new TwitterApi({
            appKey: this._appKey,
            appSecret: this._appSecret,
            accessToken: this._accessToken,
            accessSecret: this._accessSecret
        })

        const rwClient = client.readWrite
        const tweet = async() => {
            try {
                const date_ob = new Date();
                const date = ("0" + date_ob.getDate()).slice(-2);
                const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
                const year = date_ob.getFullYear();
                const hours = date_ob.getHours();
                const minutes = date_ob.getMinutes();
                const seconds = date_ob.getSeconds();
                await rwClient.v2.tweet(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds + ":Area Epitech:\n" + content + " - " + this._body);
            } catch (e) {
                console.error(e)
            }
        }
        tweet()
    }

    exportConfigValue() {
        return [this._appKey, this._appSecret, this._accessToken, this._accessSecret, this._body, this._userUUID];
    }

}

module.exports = TwitterPostTweet;
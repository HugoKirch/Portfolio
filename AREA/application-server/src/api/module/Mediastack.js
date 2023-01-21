const AreaCall = require("../reaction");
const { v4: uuidv4 } = require('uuid');
const fetch = require("node-fetch");
const axios = require('axios');

class Mediastack extends AreaCall {

    _countries;
    _keywords;
    _lastTitle;
    _userUUID;

    constructor(countries, sports, userUUID) {
        super("Mediastack", "Mediastack Action", userUUID, uuidv4(), 6);
        this._countries = countries;
        this._keywords = sports;
        this._lastTitle = "(null)";
        this._userUUID = userUUID;
    }

    setup() {
        this.loop(60);
    }

    execute(content) {

    }

    loopExecute() {
        var params = {}
        var todayDate = new Date().toISOString().slice(0, 10);
        if (this._keywords === "") {
            params = {
                access_key: globalTokenMediastack,
                countries: this._countries,
                date: todayDate
            };
        } else {
            params = {
                access_key: globalTokenMediastack,
                countries: this._countries,
                keywords: this._keywords,
                date: todayDate
            };
        }
        axios.get('http://api.mediastack.com/v1/news', {params})
            .then(res => {
                const apiResponse = res.data;
                if (apiResponse.data) {
                    if (apiResponse.data[0]) {
                        if (apiResponse.data[0].title != this._lastTitle) {
                            this._lastTitle = apiResponse.data[0].title;
                            this.preExecute("Some news today: " + apiResponse.data[0].description);
                        }
                    }
                }
            }).catch(error => {
                console.log(error);
            });
    }

    exportConfigValue() {
        return [this._countries, this._keywords, this._lastTitle, this._userUUID];
    }
}

module.exports = Mediastack;
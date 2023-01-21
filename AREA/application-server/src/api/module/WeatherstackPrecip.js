const AreaCall = require("../reaction");
const { v4: uuidv4 } = require('uuid');
const fetch = require("node-fetch");
const axios = require("axios");

class WeatherstackPrecip extends AreaCall {
    _location;
    _lastWeather;
    _userUUID;

    constructor(location, userUUID) {
        super("WeatherstackPrecip", "WeatherstackPrecip Action", userUUID, uuidv4(), 13);
        this._location = location;
        this._lastWeather = "";
        this._userUUID = userUUID;
    }

    setup() {
        this.loop(60);
    }

    execute(content) {

    }

    loopExecute() {
        const params = {
            access_key: globalTokenWeatherstack,
            query: this._location
        }
        axios.get('http://api.weatherstack.com/current', {params})
            .then(res => {
                if (!res.data.error) {
                    const apiResponse = res.data;
                    if (apiResponse.data.current.precip != this._lastWeather) {
                        this._lastWeather = apiResponse.data.current.precip;
                        this.preExecute(`The weather in ${apiResponse.location.name}:\n${apiResponse.current.weather_descriptions}`);
                    }
                } else {
                    console.log(`Response error: code: ${res.data.error.code}, info: ${res.data.error.info}`);
                }
            }).catch(error => {
                console.error("An error occurred: ", error);
            }
        );
    }

    exportConfigValue() {
        return [this._location, this._lastWeather, this._userUUID];
    }

}

module.exports = WeatherstackPrecip;
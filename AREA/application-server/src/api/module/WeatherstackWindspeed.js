const AreaCall = require("../reaction");
const { v4: uuidv4 } = require('uuid');
const fetch = require("node-fetch");
const axios = require("axios");

class WeatherstackWindspeed extends AreaCall {
    _location;
    _windspeed;
    _userUUID;

    constructor(location, windspeed, userUUID) {
        super("WeatherstackWindspeed", "WeatherstackWindspeed Action", userUUID, uuidv4(), 15);
        this._location = location;
        this._windspeed = windspeed;
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
                    if (apiResponse.current.wind_speed > this._windspeed) {
                        this.preExecute(`Humidity in ${apiResponse.location.name} is ${apiResponse.current.humidity}%`);
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
        return [this._location, this._windspeed, this._userUUID];
    }

}

module.exports = WeatherstackWindspeed;
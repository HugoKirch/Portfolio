const AreaCall = require("../reaction");
const { v4: uuidv4 } = require('uuid');
const fetch = require("node-fetch");
const axios = require("axios");

class WeatherstackTemperature extends AreaCall {
    _location;
    _minTemp;
    _maxTemp;
    _userUUID;

    constructor(location, minTemp, maxTemp, userUUID) {
        super("WeatherstackTemperature", "WeatherstackTemperature Action", userUUID, uuidv4(), 14);
        this._location = location;
        this._minTemp = minTemp;
        this._maxTemp = maxTemp;
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
                    if (apiResponse.current.temperature > this._maxTemp) {
                        this.preExecute(apiResponse.current.temperature + "°C is heater than " + this._maxTemp + "°C")
                    } else if (apiResponse.current.temperature < this._minTemp) {
                        this.preExecute(apiResponse.current.temperature + "°C is coldest than " + this._minTemp + "°C")
                    }
                } else {
                    console.log(`Response error: code: ${res.data.error.code}, info: ${res.data.error.info}`)
                }
            }).catch(error => {
                console.error("An error occurred: ", error);
            }
        );
    }

    exportConfigValue() {
        return [this._location, this._minTemp, this._maxTemp, this._userUUID];
    }

}

module.exports = WeatherstackTemperature;
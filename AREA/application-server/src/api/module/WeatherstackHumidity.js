const AreaCall = require("../reaction");
const { v4: uuidv4 } = require('uuid');
const fetch = require("node-fetch");
const axios = require("axios");

class WeatherstackHumidity extends AreaCall {
    _location;
    _executionActionTimer;
    _userUUID;

    constructor(location, executionActionTimer, userUUID) {
        super("WeatherstackHumidity", "WeatherstackHumidity Action", userUUID, uuidv4(), 11);
        this._location = location;
        this._executionActionTimer = executionActionTimer;
        this._userUUID = userUUID;
    }

    setup() {
        this.loop(this._executionActionTimer);
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
                    this.preExecute(`Humidity in ${apiResponse.location.name} is ${apiResponse.current.humidity}%`);
                } else {
                    console.log(`Response error: code: ${res.data.error.code}, info: ${res.data.error.info}`);
                }
            }).catch(error => {
                console.error("An error occurred: ", error);
            }
        );
    }

    exportConfigValue() {
        return [this._location, this._executionActionTimer, this._userUUID];
    }

}

module.exports = WeatherstackHumidity;
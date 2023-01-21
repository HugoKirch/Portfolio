const AreaCall = require("../reaction");
const { v4: uuidv4 } = require('uuid');
const fetch = require("node-fetch");
const axios = require("axios");

class WeatherstackLastUpdate extends AreaCall {
    _location;
    _lastUpdate;
    _userUUID;

    constructor(location, userUUID) {
        super("WeatherstackLastUpdate", "WeatherstackLastUpdate Action", userUUID, uuidv4(), 12);
        this._location = location;
        this._lastUpdate = "";
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
                    if (apiResponse.data.current.observation_time != this._lastUpdate) {
                        this._lastUpdate = apiResponse.data.current.observation_time;
                        this.preExecute(`The last update in ${apiResponse.location.name} was at ${apiResponse.data.current.observation_time}`);
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
        return [this._location, this._lastUpdate, this._userUUID];
    }

}

module.exports = WeatherstackLastUpdate;
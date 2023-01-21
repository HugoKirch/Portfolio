const AreaCall = require("../reaction");
const { v4: uuidv4 } = require('uuid');
const fetch = require("node-fetch");
const axios = require('axios');

class AviationstackDelayDeparture extends AreaCall {

    _flight_date;
    _flight_number;
    _flight_airport;
    _userUUID;

    constructor(flight_number, flight_date, flight_airport, userUUID) {
        super("AviationstackDelayDeparture", "AviationstackDelayDeparture Action", userUUID, uuidv4(), 3);
        this._flight_number = flight_number;
        this._flight_date = flight_date;
        this._flight_airport = flight_airport;
        this._userUUID = userUUID;
    }

    setup() {
        this.loop(1000);
    }

    execute(content) {

    }

    loopExecute() {
        console.log("token = " + globalTokenAviation);
        const params = {
            access_key: globalTokenAviation,
            flight_number: this._flight_number
        };
        axios.get('http://api.aviationstack.com/v1/flights', {params})
            .then(res => {
                const apiResponse = res.data;
                for (let data of apiResponse.data) {
                    if (data.flight_date === this._flight_date) {
                        if (data.departure.airport.includes(this._flight_airport)) {
                            if (data.departure.scheduled === data.departure.estimated) {
                                this.preExecute("Your flight will be delayed");
                            }
                            return;
                        }
                    }
                }
            }).catch(error => {
                console.log(error);
            });
    }

    exportConfigValue() {
        return [this._flight_date, this._flight_number, this._flight_airport, this._userUUID];
    }
}

module.exports = AviationstackDelayDeparture;
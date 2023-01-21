const AreaCall = require("../reaction");
const { v4: uuidv4 } = require('uuid');
const fetch = require("node-fetch");
const axios = require('axios');

class AviationstackCancelledFlight extends AreaCall {

    _flight_date;
    _flight_number;
    _userUUID;

    constructor(flight_number, flight_date, userUUID) {
        super("AviationstackCancelledFlight", "AviationstackCancelledFlight Action", userUUID, uuidv4(), 1);
        this._flight_number = flight_number;
        this._flight_date = flight_date;
        this._userUUID = userUUID;
    }

    setup() {
        this.loop(1000);
    }

    execute(content) {

    }

    loopExecute() {
        const params = {
            access_key: globalTokenAviation,
            flight_number: this._flight_number,
            flight_status: 'cancelled'
        };
        axios.get('http://api.aviationstack.com/v1/flights', {params})
            .then(res => {
                const apiResponse = res.data;
                for (let data of apiResponse.data) {
                    if (data.flight_date === this._flight_date) {
                        this.preExecute("Your flight has been cancelled");
                        return;
                    }
                }
                this.preExecute("Your flight is not cancelled");
            }).catch(error => {
                console.log(error);
            });
    }

    exportConfigValue() {
        return [this._flight_date, this._flight_number, this._userUUID];
    }
}

module.exports = AviationstackCancelledFlight;
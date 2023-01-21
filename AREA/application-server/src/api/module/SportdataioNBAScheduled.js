const AreaCall = require("../reaction");
const { v4: uuidv4 } = require('uuid');
const axios = require("axios");

class SportdataioNBAScheduled extends AreaCall {

    _lastState;
    _userUUID;

    constructor(userUUID) {
        super("SportdataioNBAScheduled", "SportdataioNBAScheduled Action", userUUID, uuidv4(), 8);
        this._lastState = "";
        this._userUUID = userUUID;
    }

    setup() {
        this.loop(180);
    }

    execute(content) {

    }

    loopExecute() {
        let date =  new Date().getFullYear() + 1;
        let todayDate = new Date().toISOString().slice(0, 10);
        const params = {
            key: globalTokenNBA,
        }
        axios.get('https://api.sportsdata.io/v3/nba/scores/json/Games/' + date, {params})
            .then(res => {
                if (!res.data.error) {
                    const apiResponse = res.data;
                    for (let data of apiResponse) {
                        if (data.Day.includes(todayDate)) {
                            this.preExecute("A Game is scheduled today: " + data.AwayTeam + " Vs " + data.HomeTeam);
                        }
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
        return [this._lastState, this._userUUID];
    }

}

module.exports = SportdataioNBAScheduled;
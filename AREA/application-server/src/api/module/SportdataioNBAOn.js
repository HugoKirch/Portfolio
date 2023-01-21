const AreaCall = require("../reaction");
const { v4: uuidv4 } = require('uuid');
const axios = require("axios");

class SportdataioNBAOn extends AreaCall {

    _lastState;
    _userUUID;

    constructor(userUUID) {
        super("SportdataioNBAOn", "SportdataioNBAOn Action", userUUID, uuidv4(), 7);
        this._lastState = "";
        this._userUUID = userUUID;
    }

    setup() {
        this.loop(180);
    }

    execute(content) {

    }

    loopExecute() {
        const params = {
            key: globalTokenNBA,
        }
        axios.get('https://api.sportsdata.io/v3/nba/scores/json/AreAnyGamesInProgress', {params})
            .then(res => {
                if (!res.data.error) {
                    const apiResponse = res.data;
                    if (this._lastState != apiResponse) {
                        this._lastState = apiResponse;
                        if (this._lastState == false) {
                            this.preExecute("Not any NBA game actually");
                        } else {
                            this.preExecute("An NBA game is in progress");
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

module.exports = SportdataioNBAOn;
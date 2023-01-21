const AreaCall = require("../reaction");
const { v4: uuidv4 } = require('uuid');
const axios = require("axios");

class SportdataioNBATeamStat extends AreaCall {
    _lastWin;
    _lastLoose;
    _teamName;
    _userUUID;
    constructor(teamName, userUUID) {
        super("SportdataioNBATeamStat", "SportdataioNBATeamStat Action", userUUID, uuidv4(), 9);
        this._lastWin = "";
        this._lastLoose = "";
        this._teamName = teamName;
        this._userUUID = userUUID;
    }

    setup() {
        this.loop(180);
    }

    execute(content) {

    }

    loopExecute() {
        let date =  new Date().getFullYear() + 1;
        const params = {
            key: globalTokenNBA,
        }
        axios.get('https://api.sportsdata.io/v3/nba/scores/json/TeamSeasonStats/' + date, {params})
            .then(res => {
                if (!res.data.error) {
                    const apiResponse = res.data;
                    for (let data of apiResponse) {
                        if (data.Name.includes(this._teamName)) {
                            if (this._lastWin == "") {
                                this._lastWin = data.Wins;
                                this._lastLoose = data.Losses;
                            } else {
                                if (this._lastWin != data.Wins) {
                                    this._lastWin = data.Wins;
                                    this._lastLoose = data.Losses;
                                    this.preExecute("The " + data.Name + " has won its last game");
                                } else if (this._lastLoose != data.Losses) {
                                    this._lastWin = data.Wins;
                                    this._lastLoose = data.Losses;
                                    this.preExecute("The " + data.Name + " has lost its last game");
                                }
                            }
                            break;
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
        return [this._lastWin, this._lastLoose, this._teamName, this._userUUID];
    }

}

module.exports = SportdataioNBATeamStat;
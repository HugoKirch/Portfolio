const User = require("./src/user/User");
const AreaCall = require("./src/api/reaction");
const DiscordMessageDetection = require("./src/api/module/DiscordMessageDetection");
const BroadcastMessage = require("./src/api/module/BroadcastMessage");
const GithubEverything = require("./src/api/module/GithubEverything");
const WeatherstackTemperature = require("./src/api/module/WeatherstackTemperature");
const WeatherstackPrecip = require("./src/api/module/WeatherstackPrecip");
const WeatherstackLastUpdate = require("./src/api/module/WeatherstackLastUpdate");
const WeatherstackHumidity= require("./src/api/module/WeatherstackHumidity");
const AviationstackCancelledFlight = require("./src/api/module/AviationstackCancelledFlight");
const GitlabEverything = require("./src/api/module/GitlabEverything");
const TwilioSendSMS = require("./src/api/module/TwilioSendSMS");
const Mediastack = require("./src/api/module/Mediastack");
const TwilioReceiveSMS = require("./src/api/module/TwilioReceiveSMS");
const SportdataioNBAOn = require("./src/api/module/SportdataioNBAOn");
const SportdataioNBAScheduled = require("./src/api/module/SportdataioNBAScheduled");
const SportdataioNBATeamStat = require("./src/api/module/SportdataioNBATeamStat");
const AviationstackDelayDeparture = require("./src/api/module/AviationstackDelayDeparture");
const AviationstackDelayArrival = require("./src/api/module/AviationstackDelayArrival");

require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors")

let applicationPort = 8080;
const databaseManager = require("./src/database/database.js");
const queryManager = require("./src/database/query_manager.js");
const areaSecurity = require("./src/security/Security.js");
const linkManager = require("./src/api/reactionLink.js");
const { request } = require("express");
global.userManager = require("./src/user/UserManager.js");
global.globalDatabaseManager = databaseManager;
global.linkManager = linkManager;
global.areaParser = require("./src/parse/parsr");
global.ParseInfo = require("./src/parse/ParseInfo");

const tokenAviation = 'd25a1bb829fdcac01c34326f89937f22';
global.globalTokenAviation = tokenAviation;
const tokenMediastack = 'f8f0f15b9bca15d5a03865c0d271ab24';
global.globalTokenMediastack = tokenMediastack;
const tokenNBA = '1a782a4cd6b54076aa377fe2981094d0';
global.globalTokenNBA = tokenNBA;
const tokenWeatherstack = '1b8f3467367d89fbf90dde4fbba481e3';
global.globalTokenWeatherstack = tokenWeatherstack;

global.actionReactionThread = [];
app.use(express.json());
app.use(cors());

global.appGlobal = app;

app.listen(applicationPort, () => {
    console.log(`[AREA] Start application server on port ${applicationPort}`);
    userManager.loadAllUser(databaseManager, (isLoaded) => {
        if (!isLoaded) return;
        let user = new User("Shurisko", "admin", "thomas.bellettini@epitech.eu");
        require("./src/route/AuthRoute.js") (app, databaseManager, queryManager, areaSecurity);
        require("./src/route/ModuleRoute.js") (app, databaseManager, queryManager, areaSecurity);
        require("./src/route/AboutRoute.js") (app, databaseManager, queryManager, areaSecurity);
        let usr = userManager.getUser("56d5ce98-8dfb-41fb-b1b0-45c82a4e550a");
        if (usr === undefined) {
            userManager.registerNewUser(databaseManager, user);
            return;
        }
        // let dTmp = new AviationstackDelayDeparture("2557", "2022-11-11", "Shanghai", usr.uuid);
        // let bTmp = new BroadcastMessage("Je suis GithubEverything", usr.uuid);
        // linkManager.linkToUser(usr, dTmp, bTmp ,usr.uuid);
    });
})
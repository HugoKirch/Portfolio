const User = require("../user/User");
const queryManager = require("../database/query_manager.js");
const DiscordMessageDetection = require("./module/DiscordMessageDetection");
const BroadcastMessage = require("../api/module/BroadcastMessage");
const GithubEverything = require("../api/module/GithubEverything");
const WeatherstackHumidity = require("./module/WeatherstackHumidity");
const WeatherstackTemperature = require("./module/WeatherstackTemperature");
const AviationstackCancelledFlight = require("./module/AviationstackCancelledFlight");
const GitlabEverything = require("./module/GitlabEverything");
const TwilioSendSMS = require("./module/TwilioSendSMS");
const Mediastack = require("./module/Mediastack");
const TwilioReceiveSMS = require("./module/TwilioReceiveSMS");
const WeatherstackWindspeed = require("./module/WeatherstackWindspeed");
const WeatherstackPrecip = require("./module/WeatherstackPrecip");
const WeatherstackLastUpdate = require("./module/WeatherstackLastUpdate");
const SportdataioNBAOn = require("./module/SportdataioNBAOn");
const SportdataioNBAScheduled = require("./module/SportdataioNBAScheduled");
const SportdataioNBATeamStat = require("./module/SportdataioNBATeamStat");
const AviationstackDelayDeparture = require("./module/AviationstackDelayDeparture");
const AviationstackDelayArrival = require("./module/AviationstackDelayArrival");
const TwitterPostTweet = require("./module/TwitterPostTweet");
const DiscordPostMessage = require("./module/DiscordPostMessage");
const moduleList = [];

module.exports = {
    buildFromCustomData: (classID, dataList) => {
        switch (classID) {
            case 0:
                return new BroadcastMessage(dataList[0], dataList[1]);
            case 1:
                return new AviationstackCancelledFlight(dataList[0], dataList[1], dataList[3]);
            case 2:
                return new AviationstackDelayArrival(dataList[0], dataList[1], dataList[2], dataList[3]);
            case 3:
                return new AviationstackDelayDeparture(dataList[0], dataList[1], dataList[2], dataList[3]);
            case 4:
                return new GithubEverything(dataList[0]);
            case 5:
                return new GitlabEverything(dataList[0]);
            case 6:
                return new Mediastack(dataList[0], dataList[1], dataList[2]);
            case 7:
                return new SportdataioNBAOn(dataList[0]);
            case 8:
                return new SportdataioNBAScheduled(dataList[0]);
            case 9:
                return new SportdataioNBATeamStat(dataList[0], dataList[1]);
            case 10:
                return new TwilioReceiveSMS(dataList[0], dataList[1]);
            case 11:
                return new WeatherstackHumidity(dataList[0], dataList[1], dataList[2]);
            case 12:
                return new WeatherstackLastUpdate(dataList[0], dataList[1]);
            case 13:
                return new WeatherstackPrecip(dataList[0], dataList[1]);
            case 14:
                return new WeatherstackTemperature(dataList[0], dataList[1], dataList[2], dataList[3]);
            case 15:
                return new WeatherstackWindspeed(dataList[0], dataList[1], dataList[2]);
            case 16:
                return new DiscordMessageDetection(dataList[0], dataList[1], dataList[2]);
            case 17:
                return new TwilioSendSMS(dataList[0], dataList[1], dataList[2], dataList[3], dataList[4], dataList[5]);
            case 18:
                return new TwitterPostTweet(dataList[0], dataList[1], dataList[2], dataList[3], dataList[4], dataList[5]);
            case 19:
                return new DiscordPostMessage(dataList[0], dataList[1], dataList[2], dataList[3]);
            default:
                return undefined;
        }
    },
    buildActionReactionFromParseInfo: (parserInfo) => {
        let reactionConfig = parserInfo.reactionSavedValue;
        let actionConfig = parserInfo.actionSavedValue;

        let reaction = linkManager.buildFromCustomData(parserInfo.reactionID, reactionConfig);
        let action = linkManager.buildFromCustomData(parserInfo.actionID, actionConfig);
        return [action, reaction];
    },
    factoryManager: (module) => {
        let m = JSON.parse(module);
        switch (m._id) {
            case 0:
                return Object.assign(new BroadcastMessage(), m);
            case 1:
                return Object.assign(new AviationstackCancelledFlight(), m);
            case 2:
                return Object.assign(new AviationstackDelayArrival(), m);
            case 3:
                return Object.assign(new AviationstackDelayDeparture(), m);
            case 4:
                return Object.assign(new GithubEverything(), m);
            case 5:
                return Object.assign(new GitlabEverything(), m);
            case 6:
                return Object.assign(new Mediastack(), m);
            case 7:
                return Object.assign(new SportdataioNBAOn(), m);
            case 8:
                return Object.assign(new SportdataioNBAScheduled(), m);
            case 9:
                return Object.assign(new SportdataioNBATeamStat(), m);
            case 10:
                return Object.assign(new TwilioReceiveSMS(), m);
            case 11:
                return Object.assign(new WeatherstackHumidity(), m);
            case 12:
                return Object.assign(new WeatherstackLastUpdate(), m);
            case 13:
                return Object.assign(new WeatherstackPrecip(), m);
            case 14:
                return Object.assign(new WeatherstackTemperature(), m);
            case 15:
                return Object.assign(new WeatherstackWindspeed(), m);
            case 16:
                return Object.assign(new DiscordMessageDetection(), m);
            case 17:
                return Object.assign(new TwilioSendSMS(), m);
            case 18:
                return Object.assign(new TwitterPostTweet(), m);
            case 19:
                return Object.assign(new DiscordPostMessage(), m);
            default:
                return undefined;
        }
    },
    linkToUser: (userProfile, action, reaction) => {
        action.setup();
        reaction.setup();
        actionReactionThread.push(action);
        actionReactionThread.push(reaction);
        userProfile.reaction.push(JSON.stringify(reaction));
        userProfile.action.push(JSON.stringify(action));
        userProfile.linked.set(action.linkUUID, reaction.linkUUID);
        userManager.updateUser(globalDatabaseManager, userProfile);
    }
}
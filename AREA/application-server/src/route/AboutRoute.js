const User = require("../user/User");
const nodemailer = require("nodemailer")
const {json} = require("express");
const {integer} = require("twilio/lib/base/deserialize");

class AboutHost {
    host;

    constructor(host) {
        this.host = host;
    }
}

class AboutAR {
    name;
    description;

    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
}

class AboutService {

    name;
    actions;
    reactions;

    constructor(name, actions, reactions) {
        this.name = name;
        this.actions = actions;
        this.reactions = reactions;
    }
}

class AboutServer {
    current_time;
    services;

    constructor(current_time, services_list) {
        this.current_time = current_time;
        this.services = services_list;
    }
}

class AboutMain {
    client;
    server;

    constructor(host, webserver) {
        this.client = new AboutHost(host);
        this.server = webserver;
    }
}



module.exports = (app, databaseManager, queryManager, areaSecurity) => {

    app.get("/about.json", (request, response) => {
        let aviationCancel = new AboutService("AviationStack", [
            new AboutAR("cancel_flight", "Fly is cancel"),
            new AboutAR("delay_arrival", "Fly arrival has delay"),
            new AboutAR("delay_departure", "Fly departure has delay")
        ], []);
        let github = new AboutService("Github", [
            new AboutAR("github_interact", "repository is edited (Push/Pull/Starred/Contributors)")
        ], []);
        let gitlab = new AboutService("Gitlab", [
            new AboutAR("gitlab_interact", "repository is edited (Push/Pull/Starred/Contributors)")
        ], []);
        let mediastack = new AboutService("MediaStack", [
            new AboutAR("news_publish", "when a news is published")
        ], []);
        let sportData = new AboutService("SportDataNBA", [
            new AboutAR("nba_live_match", "trigger if a nba match start"),
            new AboutAR("nba_live_schedule", "trigger if a nba match is schedule today"),
            new AboutAR("nba_live_teamstat", "team stat after match")
        ], []);
        let twilio = new AboutService("Twilio", [
            new AboutAR("twilio_receive", "trigger when sms is received")
        ], [new AboutAR("twilio_send", "send sms")]);
        let weatherStack = new AboutService("WeatherStack", [
            new AboutAR("humidity", "indicates humidity in location"),
            new AboutAR("last_update", "send all new weather information"),
            new AboutAR("precipitation", "send if precipitation has changed"),
            new AboutAR("temperature", "send data if the temperature is changing"),
            new AboutAR("wing_speed", "send data if the wing is changing")
        ]);
        let discord = new AboutService("Discord", [
            new AboutAR("message_detection", "check if someone send message")
        ], [new AboutAR("message_send", "send message to discord with webhook")]);
        let epoch = Math.floor(Date.now() / 1000);
        let server = new AboutServer(epoch
            , [
            aviationCancel,
            github,
            gitlab,
            sportData,
            twilio,
            mediastack,
            weatherStack,
            discord
        ]);
        let ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress
        let final = new AboutMain(`${ip}`, server);
        response.status(201).send(final);

    })

}
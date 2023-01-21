const User = require("./User");
const queryManager = require("../database/query_manager");
let userList = [];
const jwt = require("jsonwebtoken");

module.exports = {
    loadAllUser : (database, callback) => {
        database.query("SELECT * FROM user WHERE 1;", (result) => {
            for (let dbUser of result) {
                let user = new User(dbUser.username,
                    dbUser.password, dbUser.email,
                    dbUser.id, areaParser.fromParseToList(dbUser.reaction),
                    areaParser.fromParseToList(dbUser.action),
                    new Map(Object.entries(JSON.parse(dbUser.link))), false);
                if (user !== null && user !== undefined) userList.push(user);
            }
            for (let uAction of userList) {
                let actionList = uAction.action;
                for (let action of actionList) {
                    let content = linkManager.factoryManager(action);
                    if (content === undefined) continue;
                    try {
                        content.setup();
                        actionReactionThread.push(content);
                    } catch (e) {
                        console.log(e);
                    }
                }
                let reactionList = uAction.reaction;
                for (let reaction of reactionList) {
                    let content = linkManager.factoryManager(reaction);
                    if (content === undefined) continue;
                    try {
                        content.setup();
                        actionReactionThread.push(content);
                    } catch (e) {
                        console.log(e);
                    }
                }
            }


            return callback(true);
        })
    },
    registerNewUser : (database, user, callback=(bool) => {}) => {
        database.query(`${queryManager.INSERT_QUERY("user", user.mysqlValues())}`, (result) => {
            userList.push(user);
            return callback(true);
        })
    },
    updateUser : (database, user) => {
        database.query(`${queryManager.UPDATE_QUERY_USER("user", user)}`, (callback) => {
            for (let usr of userList)
                if (usr.uuid === user.uuid) userList.splice(userList.indexOf(usr), 1);
            userList.push(user);
        });
    },
    getUser : (userID) => {
        for (let usr of userList)
            if (usr.uuid === userID) return usr;
        return undefined;
    },
    extractUserFromRequest: (request) => {
        let token = request.body.token;
        let decode = jwt.verify(token, process.env.PRIVATE_KEY);
        for (let usr of userList)
            if (usr.uuid === decode.uuid) return usr;
        return undefined;
    }
}
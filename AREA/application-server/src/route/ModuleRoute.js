const User = require("../user/User");
const {assign} = require("nodemailer/lib/shared");
const {request, response} = require("express");

module.exports = (app, databaseManager, queryManager, areaSecurity) => {
    app.post("/reactions/list", (request, response) => {
        let token = request.body.token;
        if (token === undefined) {
            response.status(500).send({
                response: "No token specified"
            });
            return;
        }
        let userFounded = userManager.extractUserFromRequest(request);
        if (userFounded === undefined) {
            response.status(500).send({
                response: "No user Found"
            });
            return;
        }
        response.status(201).send({
            list: areaParser.fromListToParseWeb(userFounded)
        })
    });

    app.delete("/reactions/delete", (request, response) => {
        let token = request.body.token;
        if (token === undefined) {
            response.status(500).send({
                response: "No token specified"
            });
            return;
        }
        let userFounded = userManager.extractUserFromRequest(request);
        if (userFounded === undefined) {
            response.status(500).send({
                response: "No user Found"
            });
            return;
        }
        let reforge = Object.assign(new ParseInfo(), request.body.data);
        let reaction = userFounded.linked.get(reforge.actionUUID);

        let i = 0;
        for (let tmp of userFounded.action) {
            let extract = JSON.parse(tmp);
            if (extract._linkUUID === reforge.reactionUUID || extract._linkUUID === reforge.actionUUID) {
                if (userFounded.action.length === 1) userFounded.action.pop();
                else userFounded.action.slice(i, 1);
                break;
            }
            i++;
        }
        i = 0;
        for (let tmp of userFounded.reaction) {
            let extract = JSON.parse(tmp);
            if (extract._linkUUID === reforge.reactionUUID || extract._linkUUID === reforge.actionUUID) {
                if (userFounded.reaction.length === 1) userFounded.reaction.pop();
                else userFounded.reaction.slice(i, 1);
            }
            i++;
        }
        for (let r of actionReactionThread) {
            if (r.linkUUID === reforge.reactionUUID || r.linkUUID === reforge.actionUUID) {
                r.destruct_execute();
            }
        }
        userFounded.linked.delete(reforge.actionUUID);
        userManager.updateUser(databaseManager, userFounded);
        response.status(201).send({
            message: "Module delete with success !"
        });
    })

    app.post("/reactions/add", (request, response) => {
        let token = request.body.token;
        if (token === undefined) {
            response.status(500).send({
                response: "No token specified"
            });
            return;
        }
        let userFounded = userManager.extractUserFromRequest(request);
        if (userFounded === undefined) {
            response.status(500).send({
                response: "No user Found"
            });
            return;
        }
        let reforge = Object.assign(new ParseInfo(), request.body.data);
        let listAR = linkManager.buildActionReactionFromParseInfo(reforge);
        if (listAR[0] === undefined || listAR[1] === undefined) {
            response.status(500).send({
                message: "No Module for this ID"
            })
            return;
        }
        linkManager.linkToUser(userFounded, listAR[0], listAR[1]);
        response.status(201).send({
            message: "Module added with success"
        })
    })
}
module.exports = {
    fromListToParse: (list) => {
        let string = "";
        for (let content of list) {
            string += content;
            string += "&_&";
        }
        return string.substring(0, string.length - 3);
    },
    fromParseToList: (string) => {
        let array = [];
        if (string === "") return array;
        for (let ct of string.split("&_&"))
            array.push(ct);
        return array;
    },
    fromListToParseWeb: (user) => {
        let map = [];
        for (let action of user.action) {
            let actionForge = linkManager.factoryManager(action);
            let foundReaction = user.linked.get(actionForge.linkUUID);
            for (let reaction of user.reaction) {
                let reactionForge = linkManager.factoryManager(reaction);
                if (reactionForge.linkUUID === foundReaction) {
                    map.push(new ParseInfo(actionForge.linkUUID, actionForge.id, actionForge.exportConfigValue(), reactionForge.linkUUID, reactionForge.id, reactionForge.exportConfigValue()));
                    break;
                }
            }
        }
        return map;
    }
}
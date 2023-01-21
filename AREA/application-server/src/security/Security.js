const md5 = require('md5');
const jwt = require("jsonwebtoken");
module.exports = {
    areaHashPassword: function (password) {
        let prefix = md5(process.env.SALT_PREFIX);
        let suffix = md5(process.env.SALT_SUFFIX);
        return md5(prefix + password + suffix);
    },
    checkSamePassword: (original, password) => {
        let prefix = md5(process.env.SALT_PREFIX);
        let suffix = md5(process.env.SALT_SUFFIX);
        let tmpHash = md5(prefix + password + suffix);
        return (original === tmpHash);
    },
    generateWebToken: (email, uuid) => {
        return jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60*60*5),
            uuid: uuid
        }, process.env.PRIVATE_KEY)
    }
}
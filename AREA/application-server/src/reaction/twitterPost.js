const rwClient = require("./twitterClient.js")
const tweet = async() => {
    try {
        await rwClient.v2.tweet("Area First Action REAction")
    } catch (e) {
        console.error(e)
    }
}

tweet()


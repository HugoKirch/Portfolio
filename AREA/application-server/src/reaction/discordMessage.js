const axios = require('axios').default
const webhookURL = ""

axios({
    method: 'post',
    url: webhookURL,
    data: {
        username: "TEST BOT",
        content: "This is a test",
    },
})

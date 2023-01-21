const User = require("../user/User");
const nodemailer = require("nodemailer")

module.exports = (app, databaseManager, queryManager, areaSecurity) => {

    app.post("/register", (request, response) => {

        const username = request.body.username;
        const password = request.body.password;
        const email = request.body.email;

        if (!username || !password || !email) {
            response.status(400);
            response.send({
                response: "Missing field: username, password or email empty !"
            })
            return;
        }
        databaseManager.query(`${queryManager.SELECT_WHERE_QUERY("user", "*", `email='${email}'`)}`, (callback) => {
            if (callback.length === 0) {
                const user = new User(username, password, email);
                userManager.registerNewUser(databaseManager, user, (result) => {
                    if (result === true) {
                        response.status(201)
                            .send({
                                response: "Register Success !",
                                token: areaSecurity.generateWebToken(user.email, user.uuid)
                            })
                    } else {
                        response.status(500)
                            .send({
                                response: "Internal Error !",
                            })
                    }
                });
            } else {
                response.status(400).send({
                    response: "Register Exception: Email already used !"
                })
            }
        });
    })

    app.post("/login", (request, response) => {

        const email = request.body.email;
        const password = request.body.password;

        const googleauth = request.body.googleauth;

        if (googleauth !== undefined && email !== undefined) {
            databaseManager.query(`${queryManager.SELECT_WHERE_QUERY("user", "*", `email='${email}'`)}`, (callback) => {
                if (callback.length === 0) {
                    const user = new User(email, googleauth, email);
                    userManager.registerNewUser(databaseManager, user, (result) => {
                        if (result === true) {
                            response.status(201)
                                .send({
                                    response: "Register Success !",
                                    token: areaSecurity.generateWebToken(user.email, user.uuid)
                                })
                        } else {
                            response.status(500)
                                .send({
                                    response: "Internal Error !",
                                })
                        }
                    });
                } else {
                    response.status(201).send({
                        response: "Login Success !",
                        token: areaSecurity.generateWebToken(email, callback[0].id)
                    })
                }
            });
            return;
        }

        if (!email || !password) {
            response.status(400);
            response.send({
                response: "Missing field: email or password empty !"
            })
            return;
        }
        databaseManager.query(`${queryManager.SELECT_WHERE_QUERY("user", "*", `email='${email}'`)}`, (callback) => {
            if (callback.length === 0) {
                response.status(500).send({
                    response: "Login Exception: Incorrect email or password !"
                })
            } else {
                const hashedPassword = callback[0].password;
                if (areaSecurity.checkSamePassword(hashedPassword + "", password + "")) {
                    response.status(201).send({
                        response: "Login Success !",
                        token: areaSecurity.generateWebToken(email, callback[0].id)
                    })
                } else {
                    response.status(500).send({
                        response: "Login Exception: Incorrect email or password !"
                    })
                }
            }
        });
    })

    app.post("/forgot", (request, response) => {

        const email = request.body.email;
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789&é(-è_çà)=';
        let charactersLength = characters.length;
        for (let i = 0; i < 20; i++ )
            result += characters.charAt(Math.floor(Math.random() * charactersLength));

        if (!email) {
            response.status(400);
            response.send({
                response: "Missing field: email or password empty !"
            })
            return;
        }
        databaseManager.query(`${queryManager.SELECT_WHERE_QUERY("user", "*", `email='${email}'`)}`, (callback) => {
            if (callback.length === 0) {
                response.status(500).send({
                    response: "Login Exception: Incorrect email !"
                })
            } else {
                let user = userManager.getUser(callback[0].id);
                user.setPassword(result);
                userManager.updateUser(globalDatabaseManager, user);

                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "area.super.cool@gmail.com",
                        pass: "nxidxxnxocyxrgnb"
                    }
                })

                const mailOptions = {
                    from: "area.super.cool@gmail.com",
                    to: email,
                    subject: "Password reset",
                    text: "Your new password is " + result
                }

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log("Email sent: " + info.response)
                    }
                })
                response.status(201).send({
                    response: "Successfully sent new password !",
                })
            }
        });
    })
}
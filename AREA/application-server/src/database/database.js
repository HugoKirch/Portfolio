const mysql = require("mysql2");
const User = require("../user/User.js");

let database = mysql.createConnection({
    host: process.env.DATABASE_HOSTNAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB
})

database.connect((error) => {
    if (error) throw  error;
    console.log("Connected to database")
})

module.exports = {
    getDatabase: () => {
        return database;
    },
    query: function (query_string, callback) {
        database.query(`${query_string}`, (err, results, fields) =>
        {
            if (err) throw err;
            return callback(results);
        })
    },
    getUserFromDB: (callback, uuid) => {
        database.query(`SELECT * FROM user WHERE id='${uuid}';`, (err, result, fields) => {
            if (err) throw err;
            if (result.length === 0) callback(null);
            let user = new User(result[0].username,
                result[0].password, result[0].email,
                result[0].id, new Map(Object.entries(JSON.parse(result[0].configAction))),
                new Map(Object.entries(JSON.parse(result[0].configReaction))),
                new Map(Object.entries(JSON.parse(result[0].linkAR))), false);
            return (callback(user));
        })
    }
}

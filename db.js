const mysql = require("mysql");
const dbConfig = require("./conf/db.config");

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
})

connection.connect(err => {
    if(err) throw err;
    console.log("Se conectó bien con la base de datos.");
})

module.exports = connection;
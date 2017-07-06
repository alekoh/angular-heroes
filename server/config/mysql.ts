/**
 * Created by aleksandar.mechkaros on 5/8/2017.
 */
let mysql      = require("mysql");

module.exports = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "",
    database : "angular-heroes",
});

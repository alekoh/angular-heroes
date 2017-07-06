/**
 * Created by aleksandar.mechkaros on 4/11/2017.
 */
var heroRoutes = require("./heroes");
var userRoutes = require("./users");
module.exports = function (app, db) {
    heroRoutes(app, db);
    userRoutes(app, db);
};

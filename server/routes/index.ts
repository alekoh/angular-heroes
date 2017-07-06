
/**
 * Created by aleksandar.mechkaros on 4/11/2017.
 */

const heroRoutes = require("./heroes");
const userRoutes = require("./users");

module.exports = (app, db) => {

    heroRoutes(app, db);
    userRoutes(app, db);

};


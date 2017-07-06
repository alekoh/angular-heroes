/**
 * Created by aleksandar.mechkaros on 4/11/2017.
 */

let passport = require("passport");

let mysql = require("mysql");
let connection = require("../config/mysql");
let jwt = require("jwt-simple");


/**
 * Function that acts as a middleware, it authenticates the tokens sent from the client.
 * Returns boolean:
 *     true => if jwt is successfully decoded - Authorized
 *     false => jwt is not successfully decoded - Unauthorized
 *
 *  @params token: token sent from the client
 **/


module.exports = (app) => {
    connection.connect();

    // Get all heroes
    app.get("/heroes", (req, res) => {

        connection.query("SELECT * FROM heroes", (err, results) => {
            if (err) {
                res.send("Something wrong with the database");
            } else {
                res.send(results);
            }
        });
    });

    // Getting hero by id
    app.get("/heroes/:id", (req, res) => {

        const id = req.params.id;

        connection.query("SELECT * FROM heroes WHERE id=?", id, (err, result) => {
            if (err) {
                res.send("There is no such hero!");
            } else { res.send(result); }
        });
    });

    // Getting hero by name => used for searching heroes
    app.get("/search/:term", (req, res) => {

        let hero = { name: req.params.term };
        let query = `SELECT * FROM heroes WHERE name LIKE '%${hero.name}%'`;

        connection.query(query, (err, results) => {
            if (err) {
                res.send("There is no hero with that name");
            } else { res.send(results); }
        });
    });

    // Creating heroes
    app.post("/heroes", (req, res) => {

        /***
         * jwt.decode is a function that accepts two arguments:
         * @param token => req.body.token is the actual encoded token
         * @param key =>   "secret" is the key by which the token can be encoded
         ***/
        if (jwt.decode(req.body.token, "secret")) {

            let hero = {name: req.body.name};
            let query = `INSERT INTO heroes (name) VALUES ('${hero.name}')`;

            connection.query(query, (err) => {
                if (err) {
                    res.status(400).send("Error! That name already exists!");
                } else {
                    connection.query("SELECT * FROM heroes WHERE id IN (SELECT LAST_INSERT_ID() FROM heroes)", (error, result) => {
                        if (error) {
                            res.send("Error!");
                        } else {
                            res.send(result);
                        }
                    });
                }
            });
        } else {
            res.send("Unauthorized");
        }
    });

    // Deleting hero by id
    app.delete("/heroes/:id/:token", (req, res) => {

        if (jwt.decode(req.params.token, "secret")) {
            const id = req.params.id;

            connection.query("DELETE FROM heroes WHERE id=?", id, (err, result) => {
                if (err) {
                    res.send("Error deleting hero!");
                } else {
                    res.status(200).send(result);
                }
            });
        }});

    // Updating hero by id
    app.put("/heroes/:id", (req, res) => {

        if (jwt.decode(req.body.token, "secret")) {

            let hero = {
                id: req.params.id,
                name: req.body.name,
            };

            let query = "UPDATE heroes SET ?? = ? WHERE ?? = ?";
            let inserts = ["name", hero.name, "id", hero.id];
            query = mysql.format(query, inserts);

            connection.query(query, (err, result) => {
                if (err) {
                    res.send("Error! You must insert valid username and id");
                } else {
                    res.send(result);
                }
            });
        }
    });

};

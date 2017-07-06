/**
 * Created by aleksandar.mechkaros on 4/11/2017.
 */
var passport = require("passport");
var mysql = require("mysql");
var connection = require("../config/mysql");
var jwt = require("jwt-simple");
/**
 * Function that acts as a middleware, it authenticates the tokens sent from the client.
 * Returns boolean:
 *     true => if jwt is successfully decoded - Authorized
 *     false => jwt is not successfully decoded - Unauthorized
 *
 *  @params token: token sent from the client
 **/
module.exports = function (app) {
    connection.connect();
    // Get all heroes
    app.get("/heroes", function (req, res) {
        connection.query("SELECT * FROM heroes", function (err, results) {
            if (err) {
                res.send("Something wrong with the database");
            }
            else {
                res.send(results);
            }
        });
    });
    // Getting hero by id
    app.get("/heroes/:id", function (req, res) {
        var id = req.params.id;
        connection.query("SELECT * FROM heroes WHERE id=?", id, function (err, result) {
            if (err) {
                res.send("There is no such hero!");
            }
            else {
                res.send(result);
            }
        });
    });
    // Getting hero by name => used for searching heroes
    app.get("/search/:term", function (req, res) {
        var hero = { name: req.params.term };
        var query = "SELECT * FROM heroes WHERE name LIKE '%" + hero.name + "%'";
        connection.query(query, function (err, results) {
            if (err) {
                res.send("There is no hero with that name");
            }
            else {
                res.send(results);
            }
        });
    });
    // Creating heroes
    app.post("/heroes", function (req, res) {
        /***
         * jwt.decode is a function that accepts two arguments:
         * @param token => req.body.token is the actual encoded token
         * @param key =>   "secret" is the key by which the token can be encoded
         ***/
        if (jwt.decode(req.body.token, "secret")) {
            var hero = { name: req.body.name };
            var query = "INSERT INTO heroes (name) VALUES ('" + hero.name + "')";
            connection.query(query, function (err) {
                if (err) {
                    res.status(400).send("Error! That name already exists!");
                }
                else {
                    connection.query("SELECT * FROM heroes WHERE id IN (SELECT LAST_INSERT_ID() FROM heroes)", function (error, result) {
                        if (error) {
                            res.send("Error!");
                        }
                        else {
                            res.send(result);
                        }
                    });
                }
            });
        }
        else {
            res.send("Unauthorized");
        }
    });
    // Deleting hero by id
    app.delete("/heroes/:id/:token", function (req, res) {
        if (jwt.decode(req.params.token, "secret")) {
            var id = req.params.id;
            connection.query("DELETE FROM heroes WHERE id=?", id, function (err, result) {
                if (err) {
                    res.send("Error deleting hero!");
                }
                else {
                    res.status(200).send(result);
                }
            });
        }
    });
    // Updating hero by id
    app.put("/heroes/:id", function (req, res) {
        if (jwt.decode(req.body.token, "secret")) {
            var hero = {
                id: req.params.id,
                name: req.body.name,
            };
            var query = "UPDATE heroes SET ?? = ? WHERE ?? = ?";
            var inserts = ["name", hero.name, "id", hero.id];
            query = mysql.format(query, inserts);
            connection.query(query, function (err, result) {
                if (err) {
                    res.send("Error! You must insert valid username and id");
                }
                else {
                    res.send(result);
                }
            });
        }
    });
};

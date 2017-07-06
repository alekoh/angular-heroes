/**
 * Created by aleksandar.mechkaros on 4/11/2017.
 */
var passport = require("passport");
var connection = require("../config/mysql");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("jwt-simple");
module.exports = function (app) {
    var query = "";
    // Login users
    app.post("/users/login", passport.authenticate("local"), function (req, res) {
        res.status(200).send(req.user.token);
    });
    // Get all users
    app.get("/users", function (req, res) {
        query = "SELECT * FROM users";
        connection.query(query, function (err, results) {
            if (err) {
                res.send(err);
            }
            else {
                res.send(results);
            }
        });
    });
    // Getting user by id
    app.get("/users/:id", function (req, res) {
        var id = req.params.id;
        query = "SELECT * FROM users WHERE id = " + id;
        connection.query(query, function (err, results) {
            if (err) {
                res.send(err);
            }
            else {
                res.send(results);
            }
        });
    });
    // Creating users
    app.post("/users", function (req, res) {
        var salt = bcrypt.genSaltSync(10);
        var user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, salt),
            token: jwt.encode(req.body.username, "secret"),
        };
        query = "INSERT INTO users (firstName, lastName, username, password, token)\n                 VALUES ('" + user.firstName + "', '" + user.lastName + "', '" + user.username + "', '" + user.password + "', '" + user.token + "')";
        connection.query(query, function (err) {
            if (err) {
                res.status(401).send(err);
            }
            else {
                connection.query("SELECT * FROM users WHERE id IN (SELECT LAST_INSERT_ID() FROM users)", function (err, result) {
                    if (err) {
                        res.status(401).send(err);
                    }
                    else {
                        res.send(result);
                    }
                });
            }
        });
    });
    // Deleting user by id
    app.delete("/users/:id", function (req, res) {
        var id = req.params.id;
        query = "DELETE FROM users WHERE id=" + id;
        connection.query(query, function (err, done) {
            if (err) {
                res.send(err);
            }
            else {
                return done(null, "User deleted");
            }
        });
    });
    // Updating user by id
    app.put("/users/:id", function (req, res) {
        var id = req.params.id;
        var salt = bcrypt.genSaltSync(10);
        var user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, salt),
        };
        query = "UPDATE users\n                 SET firstName='" + user.firstName + "', lastName='" + user.lastName + "', username='" + user.username + "', password='" + user.password + "'\n                 WHERE id=" + id;
        connection.query(query, function (err, done) {
            if (err) {
                res.send(err);
            }
            else {
                res.send("Success");
            }
        });
    });
};

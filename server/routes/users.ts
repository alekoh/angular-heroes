/**
 * Created by aleksandar.mechkaros on 4/11/2017.
 */

let passport = require("passport");
let connection = require("../config/mysql");
let bcrypt = require("bcrypt-nodejs");
let jwt = require("jwt-simple");

module.exports = (app) => {
    let query = "";

    // Login users
    app.post("/users/login", passport.authenticate("local"), (req, res) => {
        res.status(200).send(req.user.token);
    });

    // Get all users
    app.get("/users", (req, res) => {
        query = "SELECT * FROM users";

        connection.query(query, (err, results) => {
            if (err) {
                res.send(err);
            } else {
                res.send(results);
            }
        });
    });

    // Getting user by id
    app.get("/users/:id", (req, res) => {

        const id = req.params.id;
        query = `SELECT * FROM users WHERE id = ${id}`;

        connection.query(query, (err, results) => {
            if (err) {
                res.send(err);
            } else {
                res.send(results);
            }
        });

    });

    // Creating users
    app.post("/users",  (req, res) => {

        const salt = bcrypt.genSaltSync(10);

        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, salt),
            token: jwt.encode(req.body.username, "secret"),
        };

        query = `INSERT INTO users (firstName, lastName, username, password, token)
                 VALUES ('${user.firstName}', '${user.lastName}', '${user.username}', '${user.password}', '${user.token}')`;

        connection.query(query, (err) => {
            if (err) {
                res.status(401).send(err);
            } else {
                connection.query("SELECT * FROM users WHERE id IN (SELECT LAST_INSERT_ID() FROM users)", function(err, result) {
                    if (err) {
                        res.status(401).send(err);
                    } else {
                        res.send(result);
                    }
                });
            }
        });
    });

    // Deleting user by id
    app.delete("/users/:id", (req, res) => {
        const id = req.params.id;

        query = `DELETE FROM users WHERE id=${id}`;

        connection.query(query, (err, done) => {
            if (err) {
                res.send(err);
            } else {
                return done(null, "User deleted");
            }
        });
    });

    // Updating user by id
    app.put("/users/:id", (req, res) => {

        const id = req.params.id;
        const salt = bcrypt.genSaltSync(10);

        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, salt),
        };

        query = `UPDATE users
                 SET firstName='${user.firstName}', lastName='${user.lastName}', username='${user.username}', password='${user.password}'
                 WHERE id=${id}`;

        connection.query(query, (err, done) => {
            if (err) {
                res.send(err);
            } else {
                res.send("Success");
            }
        });

    });

};

/**
 * Created by aleksandar.mechkaros on 6/1/2017.
 */
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var jwt = require("jwt-simple");
var connection = require("../config/mysql");
var bcrypt = require("bcrypt-nodejs");
module.exports = function (passport) {
    passport.use("local", new LocalStrategy({
        usernameField: "username",
        passwordField: "password",
    }, function (username, password, done) {
        connection.query("SELECT * FROM users WHERE username = '" + username + "'", function (err, result) {
            if (err) {
                return done(err);
            }
            else {
                if (bcrypt.compareSync(password, result[0].password)) {
                    return done(null, result[0]);
                }
                else {
                    return done(err);
                }
            }
        });
    }));
};
// Serializing and deserializing users for the session.
// We use sessions since there could be multiple http requests before a token is issued
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    connection.query("SELECT * FROM users WHERE id = '" + id + "'", function (err, user) {
        done(err, err ? null : user[0]);
    });
});

/**
 * Created by aleksandar.mechkaros on 6/1/2017.
 */

let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;
let jwt = require("jwt-simple");
let connection = require("../config/mysql");
let bcrypt = require("bcrypt-nodejs");

module.exports = (passport) => {

    passport.use("local", new LocalStrategy({
            usernameField: "username",
            passwordField: "password",
        },
        (username, password, done) => {
            connection.query(`SELECT * FROM users WHERE username = '${username}'`, (err, result) => {
                if (err) { return done(err); }

                else {
                    if (bcrypt.compareSync(password, result[0].password)) {
                        return done(null, result[0]);
                    }
                    else {
                        return done(err);
                    }
                }
            });
        },
    ));
};


// Serializing and deserializing users for the session.
// We use sessions since there could be multiple http requests before a token is issued
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    connection.query(`SELECT * FROM users WHERE id = '${id}'`, (err, user) => {
        done (err, err ? null : user[0]);
    });
})
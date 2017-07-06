/**
 * Created by aleksandar.mechkaros on 5/29/2017.
 */
/**
 * Created by aleksandar.mechkaros on 5/25/2017.
 */

const config = require('../config/database');
const FacebookStrategy = require('passport-facebook').Strategy;
let LocalStrategy = require('passport-local').Strategy;

let passport = require('passport');
let server = require('./oauth2');
let User = require('../model/users');
let Hash = require('password-hash');



module.exports = function (passport) {

    /***
     * One of passportjs's strategies -> more on https://github.com/jaredhanson/passport-facebook
     ***/
    passport.use('facebook', new FacebookStrategy({

            clientID: 617720961767322,
            clientSecret: "d7496558f3aeb4b05db700a45734971c",
            callbackURL: "http://localhost:3333/auth/facebook/callback"
        },
        function(accessToken, refreshToken, profile, done) {

            //check user table for anyone with a facebook ID of profile.id
            User.findOne({facebookID: profile['id'] }, function(err, user) {
                if (err) { return done(err); }

                if (user) { return done(err, user); }

                else {
                    user = new User({
                        facebookID: profile["id"],
                        firstName: profile['displayName'],
                    });
                    user.save(function(err) {
                        if (err) console.log(err);
                        return done(null, user);
                    });

                }
            });
        }
    ));

    /**
     *  https://github.com/jaredhanson/passport
     **/
    passport.use('local-strategy', new LocalStrategy({

        usernameField: 'email',
        passwordField: 'password',
    }, function (email, password, done) {
        User.findOne({email: email}, function (error, user) {
            if (error) {
                return done(error);
            }

            else if (user) {
                if (Hash.verify(password, user.password)) {
                    return done(null, user);
                }
                else {
                    done(error);
                }
            }

            else {
                console.log('Something wrong with database');
                done(error);
            }
        });
    }));


    /**
     * Methods for serializing and desirializing users into sessions
     */
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

};

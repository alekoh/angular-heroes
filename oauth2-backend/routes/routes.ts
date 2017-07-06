/**
 * Created by aleksandar.mechkaros on 5/25/2017.
 */

// Load required packages
let passport = require('passport');
let url = require('url');
let Application = require('../model/application');
let server = require('../authentication_methods/oauth2');
let User = require('../model/users');
let login = require('connect-ensure-login');
let jwt = require('jwt-simple');

module.exports = function (app) {


    /**
     * Initializing Oauth2 protocol
     *  It calls exported authorization method from oauth2 server to authorize the application that makes the request
     *
     *  Once the application is authorized, a login-component form is presented to the user,
     *  where the user enters his credentials directly to the server
     **/
    app.get('/auth/start', server.authorization);


    /**
     *  After submitting the form, the server authorizes the user against the login-component information
     *
     *  If the user is not logged in, a decision point is reached, where user must approve the application.
     *  After approving, a code is issued to the application.
     **/
    app.post('/auth/finish', function(req, res, next) {
        let client_id = req.body.client_id;

        if (req.user) {
            next();
        }
        else {
            passport.authenticate('local-strategy', {
                session: false
            }, function(error, user, info) {

                // Keep track of registered applications for this user
                if (user) {
                    if(client_id in user.active_applications){
                        next();
                    }
                    else {
                        user.active_applications.push(client_id);
                        user.save();
                        next();
                    }

                } else if (!error) {
                    req.flash('error', 'Your email or password was incorrect. Try again.');
                    res.redirect(req.body['auth_url'])
                }
            })(req, res, next);
        }
    }, server.decision);


    /**
     *  This route is used for exchanging code grants (refreshTokens) for access tokens
     *
     *  @param appID -> id of the client (app) used for app verification (used as a username)
     *  @param appSecret -> secret of the app, used as a password
     *
     *  After app authorization, we call server.token that will call OAuth2 exchange function and will return new access token
     **/
    app.post('/auth/exchange', function(req, res, next){
        let appID = req.body.client_id;
        let appSecret = req.body.client_secret;

        Application.findOne({ oauth_id: appID, oauth_secret: appSecret }, function(error, application) {
            if (application) {
                req.app = application;
                next();
            } else if (!error) {
                error = new Error("There was no application with the Application ID and Secret you provided.");
                next(error);
            } else {
                next(error);
            }
        }); }, server.token);


    /**
     Redirect the user to Facebook for authentication.  When complete,
     Facebook will redirect the user back to the application at ( /auth/facebook/callback )
     **/
    app.get('/auth/facebook', passport.authenticate('facebook'));


    /**
     * This is the route where facebook is redirecting user after loggin in and approving the application
     * @param token => In-house generated token for accessing the API
     */
    app.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res) => {
        let token = jwt.encode(req.user.firstName, "secret");
        res.redirect(`http://localhost:4200/code/?fbToken=${token}`);
    });
};
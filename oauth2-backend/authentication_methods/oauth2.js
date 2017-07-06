/**
 * Created by aleksandar.mechkaros on 5/25/2017.
 */
// Load required packages
var oauth2orize = require('oauth2orize');
var GrantCode = require('../model/grant-code');
var AccessToken = require('../model/access-token');
var Application = require('../model/application');
var jwt = require('jwt-simple');
var url = require('url');
// Creating new Oauth2 server that will expose an authorize middleware for handling authorization
var server = oauth2orize.createServer();
// user authorization endpoint
//
// `authorization` middleware accepts a `validate` callback which is
// responsible for validating the client making the authorization request.  In
// doing so, is recommended that the `redirectUri` be checked against a
// registered value, although security requirements may vary accross
// implementations.  Once validated, the `callback` callback must be invoked with
// a `client` instance, as well as the `redirectUri` to which the user will be
// redirected after an authorization decision is obtained.
//
// This middleware simply initializes a new authorization transaction.  It is
// the application's responsibility to authenticate the user and render a dialog
// to obtain their approval (displaying details about the client requesting
// authorization).  We accomplish that here by routing through `ensureLoggedIn()`
// first, and rendering the `oauth` view.
exports.authorization = [
    server.authorization(function (applicationID, redirectURI, done) {
        Application.findOne({ oauth_id: applicationID }, function (error, application) {
            if (application) {
                var match = false, uri = url.parse(redirectURI || '');
                for (var i = 0; i < application.allowed_domains.length; i++) {
                    if (uri.host == application.allowed_domains[i] ||
                        (uri.protocol == application.allowed_domains[i] && uri.protocol != 'http' && uri.protocol != 'https')) {
                        match = true;
                        break;
                    }
                }
                if (match && redirectURI && redirectURI.length > 0) {
                    done(null, application, redirectURI);
                }
                else {
                    done(new Error("You must supply a redirect_uri that is a domain or url scheme owned by your app."), false);
                }
            }
            else if (!error) {
                done(new Error("There is no app with the client_id you supplied."), false);
            }
            else {
                done(error);
            }
        });
    }),
    function (req, res) {
        var scopeMap = {
            // ... display strings for all scope labels ...
            view_account: 'view your account',
            edit_account: 'view and edit your account',
        };
        res.render('oauth', {
            transaction_id: req.oauth2.transactionID,
            user: req.user,
            application: req.oauth2.client,
            currentURL: req.originalUrl,
            response_type: req.query.response_type,
            errors: req.flash('error'),
            scope: req.oauth2.req.scope,
            map: scopeMap
        });
    }
];
// user decision endpoint
//
// `decision` middleware processes a user's decision to allow or deny access
// requested by a client application.  Based on the grant type requested by the
// client, the above grant middleware configured above will be invoked to send
// a response.
exports.decision = [
    server.decision(function (req, done) {
        done(null, req.oauth2.scope);
    })
];
// Grant authorization codes.  The callback takes the `client` requesting
// authorization, the `redirectUri` (which is used as a verifier in the
// subsequent exchange), the authenticated `user` granting access, and
// their response, which contains approved scope, duration, etc. as parsed by
// the application.  The application issues a code, which is bound to these
// values, and will be exchanged for an access token.
server.grant(oauth2orize.grant.code(function (application, redirectURI, user, ares, done) {
    var date = new Date();
    var time = date - (date.getTimezoneOffset() * 60000);
    var myTime = new Date(time);
    var grant = new GrantCode({
        user: user,
        application: application,
        scope: ares.scope,
        redirectUri: redirectURI,
        createdAt: myTime
    });
    console.log(grant.createdAt);
    grant.save(function (err) {
        if (err) {
            console.log("Error saving code!");
        }
        else {
            done(null, grant.code);
        }
    });
}));
// token endpoint
//
// `token` middleware handles client requests to exchange authorization grants
// for access tokens.  Based on the grant type being exchanged, the above
// exchange middleware will be invoked to handle the request.  Clients must
// authenticate when making requests to this endpoint.
exports.token = [
    server.token(),
    server.errorHandler()
];
// Exchange authorization codes for access tokens.  The callback accepts the
// `client`, which is exchanging `code` and any `redirectUri` from the
// authorization request for verification.  If these values are validated, the
// application issues an access token on behalf of the user who authorized the
// code.
server.exchange(oauth2orize.exchange.code({
    userProperty: 'app'
}, function (application, code, redirectURI, done) {
    GrantCode.findOne({ code: code }, function (error, grant) {
        if (grant && grant.application == application.id) {
            var payload = {
                secret: grant.oauth_secret,
                scope: grant.scope,
                userId: grant.user,
                time: Date.now()
            };
            var token = new AccessToken({
                token: jwt.encode(payload, 'secret'),
            });
            done(null, token.token);
        }
        else {
            done(null, error);
        }
    });
}));
// Serializing and deserializing users for the session.
// We use sessions since there could be multiple http requests before a token is issued
server.serializeClient(function (application, done) {
    done(null, application.id);
});
server.deserializeClient(function (id, done) {
    Application.findById(id, function (error, application) {
        done(error, error ? null : application);
    });
});

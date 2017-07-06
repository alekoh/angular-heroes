"use strict";
/**
 * Created by aleksandar.mechkaros on 4/10/2017.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/Rx");
var token_1 = require("../../_model/token");
var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.body = new http_1.URLSearchParams();
        this.authServer = "http://localhost:3333/auth";
        this.localAuthServer = "http://localhost:8000/users/login";
    }
    /**
     * Local login, user is authenticated against the internal database
     * @param user => username and password of the user to authenticate against the local DB.
     * @return {Observable<any>}
     */
    AuthenticationService.prototype.appLogin = function (user) {
        var _this = this;
        var headers = new http_1.Headers({ "Content-Type": "application/x-www-form-urlencoded" });
        var options = new http_1.RequestOptions({ headers: headers });
        this.body.set("username", user.username);
        this.body.set("password", user.password);
        return this.http.post(this.localAuthServer, this.body, options)
            .map(function (res) {
            if (res["statusText"] === "OK") {
                sessionStorage.setItem("token", res["_body"]);
                _this.LoggedIn = true;
            }
            else {
                _this.LoggedIn = false;
            }
        });
    };
    /**
     *
     * @param fbToken => this is the token that is created on the server after the user is logged in using facebook.
     */
    AuthenticationService.prototype.fbLogin = function (fbToken) {
        sessionStorage.setItem("token", fbToken);
        this.LoggedIn = true;
        window.location.replace("http://localhost:4200/dashboard");
    };
    /**
     * First step of OAuth2 login protocol
     * If there is a refresh token, initialize exchange for an access token
     * otherwise open modal window with request url to the OAuth2 server
     */
    AuthenticationService.prototype.login = function () {
        var response_type = "code";
        var client_id = 12;
        var redirectUri = "http://localhost:4200/code";
        var callUrl = this.authServer + "/start/?client_id=" + client_id + "&response_type=code&scope=edit_account&redirect_uri=" + redirectUri;
        if (localStorage.getItem("refreshToken") !== null) {
            this.exchangeCodeForTokenFromMainWindow(localStorage.getItem("refreshToken"));
        }
        else {
            this.myWindow = window.open(callUrl, "_blank", "height=600, width=400");
        }
    };
    /**
     * Method for exchanging refreshToken for an access token when there is no active refreshToken
     * @param code => Acting as refreshToken, this is the code that is first received after successful login against OAuth2 server
     */
    AuthenticationService.prototype.exchangeCodeForToken = function (code) {
        var _this = this;
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.post(this.authServer + "/exchange", {
            "code": code,
            "client_secret": "secret",
            "client_id": 12,
            "grant_type": "authorization_code",
            "redirectURI": "http://localhost:4200"
        }, options)
            .toPromise()
            .then(function (res) {
            var resObject = JSON.parse(res["_body"]);
            _this.token = new token_1.Token(resObject.access_token, resObject.token_type);
            window.opener.sessionStorage.setItem("token", _this.token.access_token);
            window.opener.localStorage.setItem("refreshToken", code);
            setTimeout(function () {
                window.opener.location.replace("http://localhost:4200/dashboard");
                window.close();
            }, 2000);
        });
    };
    /**
     * Method for exchanging refreshToken for an access token if there is active refreshToken in the localStorage
     * @param code => Active refreshToken
     */
    AuthenticationService.prototype.exchangeCodeForTokenFromMainWindow = function (code) {
        var _this = this;
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.post(this.authServer + "/exchange", {
            "code": code,
            "client_secret": "secret",
            "client_id": 12,
            "grant_type": "authorization_code",
            "redirectURI": "http://localhost:4200"
        }, options)
            .toPromise()
            .then(function (res) {
            var resObject = JSON.parse(res["_body"]);
            if (Object.keys(resObject).length === 1) {
                localStorage.clear();
                _this.login();
            }
            else {
                _this.token = new token_1.Token(resObject.access_token, resObject.token_type);
                sessionStorage.setItem("token", _this.token.access_token);
                window.location.replace("http://localhost:4200/dashboard");
            }
        });
    };
    AuthenticationService.prototype.receivedToken = function () {
        this.tokenValue = sessionStorage.getItem("token");
        this.LoggedIn = this.tokenValue !== null;
        return sessionStorage.getItem("token");
    };
    AuthenticationService.prototype.logout = function () {
        sessionStorage.removeItem("token");
        this.LoggedIn = false;
    };
    AuthenticationService.prototype.isLoggedIn = function () {
        return this.LoggedIn;
    };
    AuthenticationService.prototype.handleError = function () {
        this.LoggedIn = false;
        console.log("Error");
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    core_1.Injectable()
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;

/**
 * Created by aleksandar.mechkaros on 4/10/2017.
 */

import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, URLSearchParams, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import { Token } from "../../_model/token";
import { User } from "../../_model/user";


@Injectable()
export class AuthenticationService {
    public user: User;
    public token: Token;
    public LoggedIn: boolean;
    public myWindow: Window;
    private body = new URLSearchParams();
    authServer = "http://localhost:3333/auth";
    localAuthServer = "http://localhost:8000/users/login";

    constructor(private http: Http) { }

    /**
     * Local login, user is authenticated against the internal database
     * @param user => username and password of the user to authenticate against the local DB.
     * @return {Observable<any>}
     */
    appLogin(user): Observable<any> {
        const headers = new Headers({ "Content-Type": "application/x-www-form-urlencoded" });
        const options = new RequestOptions({ headers: headers });
        this.body.set("username", user.username);
        this.body.set("password", user.password);

        return this.http.post(this.localAuthServer, this.body, options)
            .map(res => {
                if (res["statusText"] === "OK") {
                    sessionStorage.setItem("token", res["_body"]);
                    this.LoggedIn = true;
                } else {
                    this.LoggedIn = false;
                }
            });
    }


    /**
     *
     * @param fbToken => this is the token that is created on the server after the user is logged in using facebook.
     */
    fbLogin(fbToken: string): void {
        sessionStorage.setItem("token", fbToken);
        this.LoggedIn = true;
        window.location.replace("http://localhost:4200/dashboard");
    }


    /**
     * First step of OAuth2 login protocol
     * If there is a refresh token, initialize exchange for an access token
     * otherwise open modal window with request url to the OAuth2 server
     */
    login() {
        const response_type = "code";
        const client_id = 12;
        const redirectUri = "http://localhost:4200/code";
        const callUrl = `${this.authServer}/start/?client_id=${client_id}&response_type=code&scope=edit_account&redirect_uri=${redirectUri}`;

        if (localStorage.getItem("refreshToken") !== null) {
            this.exchangeCodeForTokenFromMainWindow(localStorage.getItem("refreshToken"));
        } else {
            this.myWindow = window.open(callUrl, "_blank", "height=600, width=400");
        }
    }


    /**
     * Method for exchanging refreshToken for an access token when there is no active refreshToken
     * @param code => Acting as refreshToken, this is the code that is first received after successful login against OAuth2 server
     */
    exchangeCodeForToken(code) {
        const headers = new Headers({ "Content-Type": "application/json" });
        const options = new RequestOptions({ headers: headers });

        this.http.post(`${this.authServer}/exchange`,
            {
                "code": code,
                "client_secret": "secret",
                "client_id": 12,
                "grant_type": "authorization_code",
                "redirectURI": "http://localhost:4200"
            }, options)

            .toPromise()
            .then((res) => {
                const resObject = JSON.parse(res["_body"]);
                this.token = new Token(resObject.access_token, resObject.token_type);

                window.opener.sessionStorage.setItem("token", this.token.access_token);
                window.opener.localStorage.setItem("refreshToken", code);

                setTimeout(function() {
                    window.opener.location.replace("http://localhost:4200/dashboard");
                    window.close();
                }, 2000);
            });
    }


    /**
     * Method for exchanging refreshToken for an access token if there is active refreshToken in the localStorage
     * @param code => Active refreshToken
     */
    exchangeCodeForTokenFromMainWindow(code) {
        const headers = new Headers({ "Content-Type": "application/json" });
        const options = new RequestOptions({ headers: headers });

        this.http.post(`${this.authServer}/exchange`,
            {
                "code": code,
                "client_secret": "secret",
                "client_id": 12,
                "grant_type": "authorization_code",
                "redirectURI": "http://localhost:4200"
            }, options)

            .toPromise()
            .then((res) => {
                const resObject = JSON.parse(res["_body"]);

                if (Object.keys(resObject).length === 1) {
                    localStorage.clear();
                    this.login();
                } else {
                    this.token = new Token(resObject.access_token, resObject.token_type);

                    sessionStorage.setItem("token", this.token.access_token);
                    window.location.replace("http://localhost:4200/dashboard");
                }

            });
    }


    receivedToken(): string {
        sessionStorage.getItem("token").length === 0 ?
            this.LoggedIn = false : this.LoggedIn = true;

        return sessionStorage.getItem("token");
    }

    logout(): void {
        sessionStorage.removeItem("token");

        this.LoggedIn = false;
    }

    isLoggedIn(): boolean {
        return this.LoggedIn;
    }

    handleError() {
        this.LoggedIn = false;
        console.log("Error");
    }

}

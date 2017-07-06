"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var HeroService = (function () {
    function HeroService(http) {
        this.http = http;
        this.heroesUrl = "http://localhost:8000/heroes"; // URL to web api
        this.headers = new http_1.Headers({ "Content-Type": "application/x-www-form-urlencoded" });
        this.options = new http_1.RequestOptions({ headers: this.headers });
        this.body = new http_1.URLSearchParams();
    }
    HeroService.prototype.getHeroes = function () {
        console.log("Called getHeroes");
        return this.http.get(this.heroesUrl)
            .map(function (res) { return res.json(); });
    };
    HeroService.prototype.getHero = function (id) {
        var url = this.heroesUrl + "/" + id;
        return this.http.get(url)
            .map(function (response) { return response.json()[0]; });
    };
    HeroService.prototype.update = function (hero) {
        var url = this.heroesUrl + "/" + hero.id;
        this.body.set("name", hero.name);
        this.body.set("token", sessionStorage.getItem("token"));
        return this.http
            .put(url, this.body, this.options)
            .toPromise()
            .then(function () { return hero; })
            .catch(this.handleError);
    };
    HeroService.prototype.create = function (name) {
        console.log(name);
        this.body.set("name", name);
        this.body.set("token", sessionStorage.getItem("token"));
        var url = "" + this.heroesUrl;
        return this.http
            .post(url, this.body, this.options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    HeroService.prototype.delete = function (id) {
        var token = sessionStorage.getItem("token");
        var url = this.heroesUrl + "/" + id + "/" + token;
        return this.http
            .delete(url)
            .toPromise()
            .then(function () { return null; });
    };
    HeroService.prototype.handleError = function (error) {
        console.error("An error has occured", error);
        return Promise.reject(error.message || error);
    };
    return HeroService;
}());
HeroService = __decorate([
    core_1.Injectable()
], HeroService);
exports.HeroService = HeroService;

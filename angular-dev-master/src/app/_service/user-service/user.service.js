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
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.usersUrl = "http://localhost:8000/users"; // URL to web api
        this.headers = new http_1.Headers({ "Content-Type": "application/x-www-form-urlencoded" });
        this.options = new http_1.RequestOptions({ headers: this.headers });
        this.body = new http_1.URLSearchParams();
    }
    UserService.prototype.getAll = function () {
        return this.http
            .get(this.usersUrl)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getById = function (id) {
        return this.http
            .get(this.usersUrl + id)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.create = function (user) {
        this.body.set("firstName", user.fname);
        this.body.set("lastName", user.lname);
        this.body.set("username", user.username);
        this.body.set("password", user.password);
        return this.http
            .post(this.usersUrl, this.body, this.options)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.update = function (user) {
        return this.http
            .put(this.usersUrl + user._id, user)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.delete = function (id) {
        return this.http
            .delete(this.usersUrl + id)
            .map(function (response) { return response.json(); });
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable()
], UserService);
exports.UserService = UserService;

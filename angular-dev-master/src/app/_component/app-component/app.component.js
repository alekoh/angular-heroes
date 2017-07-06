"use strict";
/** Created by alekoh **/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.title = "Tour of Heroes";
        this.welcome = "-- not initialized yet --";
    }
    AppComponent.prototype.ngOnInit = function () {
        this.getUser();
    };
    AppComponent.prototype.getUser = function () {
        return this.authService.userName;
    };
    AppComponent.prototype.logout = function () {
        this.authService.logout();
        this.router.navigate(["/dashboard"]);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        templateUrl: "./app-component.html",
        styleUrls: ["./app-component.css"]
    })
], AppComponent);
exports.AppComponent = AppComponent;

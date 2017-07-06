"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/switchMap");
var HelloHeroComponent = (function () {
    function HelloHeroComponent(route, router, heroService, authService) {
        this.route = route;
        this.router = router;
        this.heroService = heroService;
        this.authService = authService;
    }
    HelloHeroComponent.prototype.ngOnInit = function () {
        this.showMyHero();
    };
    HelloHeroComponent.prototype.showMyHero = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) {
            return _this.heroService.getHero(params["id"]);
        })
            .subscribe(function (hero) { return _this.hero = hero; });
    };
    HelloHeroComponent.prototype.gotoDetail = function () {
        this.authService.isLoggedIn() ?
            this.router.navigate(["/management", this.hero.id]) :
            this.router.navigate(["/detail", this.hero.id]);
    };
    return HelloHeroComponent;
}());
HelloHeroComponent = __decorate([
    core_1.Component({
        selector: "app-hello-hero",
        templateUrl: "./hello-hero.component.html",
        styleUrls: ["./hello-hero.component.css"]
    })
], HelloHeroComponent);
exports.HelloHeroComponent = HelloHeroComponent;

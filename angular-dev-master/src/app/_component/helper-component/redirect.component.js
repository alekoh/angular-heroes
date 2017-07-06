"use strict";
/**
 * Created by aleksandar.mechkaros on 5/10/2017.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/switchMap");
var RedirectComponent = (function () {
    function RedirectComponent(router, route, authService) {
        this.router = router;
        this.route = route;
        this.authService = authService;
    }
    RedirectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams
            .subscribe(function (params) {
            _this.code = params["code"];
            _this.fbToken = params["fbToken"];
        });
        if (this.code === undefined) {
            // console.log(this.fbToken);
            this.authService.fbLogin(this.fbToken);
        }
        else {
            this.authService.exchangeCodeForToken(this.code);
        }
    };
    return RedirectComponent;
}());
RedirectComponent = __decorate([
    core_1.Component({
        selector: "app-redirect",
        template: ""
    })
], RedirectComponent);
exports.RedirectComponent = RedirectComponent;

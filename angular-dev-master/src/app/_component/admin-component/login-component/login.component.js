"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var LoginComponent = (function () {
    function LoginComponent(authService, router, formBuilder) {
        this.authService = authService;
        this.router = router;
        this.formBuilder = formBuilder;
        this.body = "";
        this.form = formBuilder.group({
            "username": ["", forms_1.Validators.required],
            "password": ["", forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(6)])]
        });
    }
    LoginComponent.prototype.onSubmit = function () {
        this.authService.login();
    };
    LoginComponent.prototype.appLogin = function (user) {
        var _this = this;
        this.authService.appLogin(user)
            .subscribe(function (res) {
            _this.router.navigate(["/dashboard"]);
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: "app-login",
        templateUrl: "./login.component.html"
    })
], LoginComponent);
exports.LoginComponent = LoginComponent;

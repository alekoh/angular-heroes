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
var RegisterComponent = (function () {
    function RegisterComponent(router, userService, fb) {
        this.router = router;
        this.userService = userService;
        this.fb = fb;
        this.form = fb.group({
            "fname": [null, forms_1.Validators.required],
            "lname": [null, forms_1.Validators.required],
            "username": [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4)])],
            "password": [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(6), forms_1.Validators.maxLength(13)])]
        });
    }
    RegisterComponent.prototype.add = function (user) {
        var _this = this;
        this.userService.create(user)
            .subscribe(function (res) {
            _this.router.navigate(["/login"]);
        });
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        selector: "register",
        templateUrl: "register.component.html",
        styleUrls: ["register.component.css"]
    })
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;

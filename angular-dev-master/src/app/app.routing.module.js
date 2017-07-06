"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var dashboard_component_1 = require("./_component/dashboard-component/dashboard.component");
var hero_detail_component_1 = require("./_component/hero-detail-component/hero-detail.component");
var login_component_1 = require("./_component/admin-component/login-component/login.component");
var auth_guard_1 = require("./_service/auth-service/auth.guard");
var register_component_1 = require("./_component/admin-component/register-component/register.component");
var manage_heroes_component_1 = require("./_component/management-heroes-component/manage-heroes.component");
var users_component_component_1 = require("./_component/users-component/users-component.component");
var redirect_component_1 = require("./_component/helper-component/redirect.component");
var routes = [
    { path: "", redirectTo: "/dashboard", pathMatch: "full" },
    { path: "dashboard", component: dashboard_component_1.DashboardComponent },
    { path: "detail/:id", component: hero_detail_component_1.HeroDetailComponent },
    { path: "login", component: login_component_1.LoginComponent },
    { path: "register", component: register_component_1.RegisterComponent },
    { path: "hidden", component: manage_heroes_component_1.HiddenHeroesComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: "management/:id", component: hero_detail_component_1.HeroDetailComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: "code", component: redirect_component_1.RedirectComponent,
        children: [
            {
                path: ":fbToken", component: redirect_component_1.RedirectComponent
            }
        ] },
    { path: "users", component: users_component_component_1.UsersComponent, canActivate: [auth_guard_1.AuthGuard] }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var heroes_routing_module_1 = require("./_component/heroes-component/heroes-routing.module");
var app_routing_module_1 = require("./app.routing.module");
var angular_in_memory_web_api_1 = require("angular-in-memory-web-api");
var ng2_facebook_sdk_1 = require("ng2-facebook-sdk");
var material_1 = require("@angular/material");
var animations_1 = require("@angular/platform-browser/animations");
// Services
var in_memory_data_service_1 = require("./_service/fake-backend/in-memory-data.service");
var hero_service_1 = require("./_service/hero-service/hero.service");
var auth_service_1 = require("./_service/auth-service/auth.service");
var auth_guard_1 = require("./_service/auth-service/auth.guard");
var user_service_1 = require("./_service/user-service/user.service");
// Components
var register_component_1 = require("./_component/admin-component/register-component/register.component");
var app_component_1 = require("./_component/app-component/app.component");
var hero_detail_component_1 = require("./_component/hero-detail-component/hero-detail.component");
var heroes_component_1 = require("./_component/heroes-component/heroes-list/heroes.component");
var dashboard_component_1 = require("./_component/dashboard-component/dashboard.component");
var hero_search_component_1 = require("./_component/hero-search-component/hero-search.component");
var hello_hero_component_1 = require("./_component/heroes-component/heroes-preview/hello-hero.component");
var main_heroes_component_1 = require("./_component/heroes-component/main-heroes.component");
var login_component_1 = require("./_component/admin-component/login-component/login.component");
var manage_heroes_component_1 = require("./_component/management-heroes-component/manage-heroes.component");
var users_component_component_1 = require("./_component/users-component/users-component.component");
var redirect_component_1 = require("./_component/helper-component/redirect.component");
var color_directive_1 = require("./_directive/color.directive");
var highlight_directive_1 = require("./_directive/highlight.directive");
// Fake backend
var fake_backend_1 = require("./_service/fake-backend/fake-backend");
var testing_1 = require("@angular/http/testing");
var http_2 = require("@angular/http");
// Pipes
var sanitize_1 = require("app/_pipe/sanitize");
// External
require("hammerjs");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            hero_detail_component_1.HeroDetailComponent,
            heroes_component_1.HeroesComponent,
            dashboard_component_1.DashboardComponent,
            hero_search_component_1.HeroSearchComponent,
            hello_hero_component_1.HelloHeroComponent,
            main_heroes_component_1.HeroesComponentMain,
            login_component_1.LoginComponent,
            register_component_1.RegisterComponent,
            users_component_component_1.UsersComponent,
            manage_heroes_component_1.HiddenHeroesComponent,
            redirect_component_1.RedirectComponent,
            highlight_directive_1.HighlightDirective,
            color_directive_1.ColorDirective,
            sanitize_1.SanitizeHtml
        ],
        imports: [
            platform_browser_1.BrowserModule,
            animations_1.BrowserAnimationsModule,
            material_1.MaterialModule,
            material_1.MdButtonModule,
            material_1.MdCheckboxModule,
            app_routing_module_1.AppRoutingModule,
            heroes_routing_module_1.HeroRoutingModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            // Including the ReactiveFormsModule in our application
            forms_1.ReactiveFormsModule,
            angular_in_memory_web_api_1.InMemoryWebApiModule.forRoot(in_memory_data_service_1.InMemoryDataService, { passThruUnknownUrl: true }),
            ng2_facebook_sdk_1.FacebookModule.forRoot()
        ],
        providers: [
            hero_service_1.HeroService,
            auth_service_1.AuthenticationService,
            auth_guard_1.AuthGuard,
            user_service_1.UserService,
            // Fake backend
            fake_backend_1.fakeBackendProvider,
            testing_1.MockBackend,
            http_2.BaseRequestOptions,
        ],
        bootstrap: [app_component_1.AppComponent],
    })
], AppModule);
exports.AppModule = AppModule;

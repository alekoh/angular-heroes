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
var hello_hero_component_1 = require("./heroes-preview/hello-hero.component");
var heroes_component_1 = require("./heroes-list/heroes.component");
var heroRoutes = [
    {
        path: "heroes",
        children: [
            {
                path: "",
                component: heroes_component_1.HeroesComponent,
                children: [
                    {
                        path: ":id", component: hello_hero_component_1.HelloHeroComponent
                    }
                ]
            }
        ]
    }
];
var HeroRoutingModule = (function () {
    function HeroRoutingModule() {
    }
    return HeroRoutingModule;
}());
HeroRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(heroRoutes)],
        exports: [router_1.RouterModule]
    })
], HeroRoutingModule);
exports.HeroRoutingModule = HeroRoutingModule;

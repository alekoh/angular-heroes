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
var HiddenHeroesComponent = (function () {
    function HiddenHeroesComponent(heroService, router, formBuilder) {
        this.heroService = heroService;
        this.router = router;
        this.formBuilder = formBuilder;
        this.form = formBuilder.group({
            "name": ["", forms_1.Validators.required],
        });
    }
    HiddenHeroesComponent.prototype.getHeroes = function () {
        var _this = this;
        this.heroService.getHeroes()
            .subscribe(function (heroes) { return _this.heroes = heroes; });
    };
    HiddenHeroesComponent.prototype.ngOnInit = function () {
        this.getHeroes();
    };
    HiddenHeroesComponent.prototype.manageDetails = function (hero) {
        this.selectedHero = hero;
        this.router.navigate(["/management", hero.id]);
    };
    HiddenHeroesComponent.prototype.add = function (hero) {
        var _this = this;
        this.heroService.create(hero.name)
            .then(function (res) {
            _this.heroes.push(res[0]);
        })
            .catch(function (reason) { return _this.message = reason["_body"]; });
    };
    HiddenHeroesComponent.prototype.delete = function (hero) {
        var _this = this;
        if (confirm("Delete " + hero.name + " ?")) {
            this.heroService
                .delete(hero.id)
                .then(function () {
                _this.heroes.filter(function (h) { return h !== hero; });
                if (_this.selectedHero === hero) {
                    _this.selectedHero = null;
                }
                _this.router.navigate(["/dashboard"]);
            });
        }
    };
    return HiddenHeroesComponent;
}());
HiddenHeroesComponent = __decorate([
    core_1.Component({
        selector: "hidden-heroes",
        templateUrl: "./manage-heroes.component.html",
        styleUrls: ["./manage-heroes.component.css"],
    })
], HiddenHeroesComponent);
exports.HiddenHeroesComponent = HiddenHeroesComponent;

import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Hero } from "app/_model/hero";
import { HeroService } from "app/_service/hero-service/hero.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: "hidden-heroes",
    templateUrl: "./manage-heroes.component.html",
    styleUrls: ["./manage-heroes.component.css"],
})


export class HiddenHeroesComponent implements OnInit {
    selectedHero: Hero;
    heroes: Hero[];
    form: FormGroup;

    constructor(private heroService: HeroService,
                private router: Router,
                private formBuilder: FormBuilder
    ) {
        this.form = formBuilder.group({
            "name": ["", Validators.required],
        });
    }

    getHeroes(): void {
        this.heroService.getHeroes()
            .subscribe(heroes => this.heroes = heroes);
    }

    ngOnInit(): void {
        this.getHeroes();
    }

    manageDetails(hero: Hero): void {
        this.selectedHero = hero;
        this.router.navigate(["/management", hero.id]);
    }

    add(hero: any): void {
        this.heroService.create(hero.name)
            .then(res => {
                this.heroes.push(res[0]);
                hero.reset();
            });
    }

    delete(hero: Hero): void {
        if (confirm("Delete " + hero.name + " ?")) {
            this.heroService
                .delete(hero.id)
                .then(() => {
                    this.heroes.filter(h => h !== hero);
                    if (this.selectedHero === hero) { this.selectedHero = null; }
                    this.router.navigate(["/dashboard"]);
                });
        }
    }

}

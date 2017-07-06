import {AfterViewInit, Component, OnInit} from "@angular/core";

import { Hero } from "app/_model/hero";
import { HeroService } from "app/_service/hero-service/hero.service";
import {AuthenticationService} from "app/_service/auth-service/auth.service";
import { NgClass } from "@angular/common";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.css"],
})

export class DashboardComponent implements OnInit, AfterViewInit {

    heroes: Hero[];

    constructor(private heroService: HeroService,
                private authService: AuthenticationService) { }

    ngOnInit(): void {
        this.heroService.getHeroes()
            .subscribe(heroes => this.heroes = heroes);
    }


    // Gets the received token and checks the LoggedIn property
    ngAfterViewInit(): void {
        this.authService.receivedToken();
    }



}


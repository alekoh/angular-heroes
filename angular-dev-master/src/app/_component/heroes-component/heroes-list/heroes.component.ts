import { Component } from "@angular/core";
import { MdDialog } from "@angular/material";
import { Hero } from "app/_model/hero";
import { OnInit } from "@angular/core";
import { HeroService } from "app/_service/hero-service/hero.service";
import { Router } from "@angular/router";
import { AuthenticationService } from "app/_service/auth-service/auth.service";

@Component({
  selector: "my-heroes",
  templateUrl: "./heroes.component.view.html",
  styleUrls: ["./heroes.component.css"],
})


export class HeroesComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[];

  constructor(private heroService: HeroService,
              private router: Router,
              private authService: AuthenticationService
              ) { };

  getHeroes(): void {
      this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  ngOnInit(): void {
      this.getHeroes();
  }

  onSelect(hero: Hero): void {
      this.selectedHero = hero;
      this.router.navigate(["/heroes", hero.id], { queryParams: {heroName: hero.name}});
  }

}

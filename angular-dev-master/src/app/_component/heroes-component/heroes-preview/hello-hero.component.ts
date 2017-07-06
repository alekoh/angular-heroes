import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import "rxjs/add/operator/switchMap";
import { HeroService } from "app/_service/hero-service/hero.service";
import { Hero } from "app/_model/hero";
import { AuthenticationService } from "app/_service/auth-service/auth.service";

@Component({
  selector: "app-hello-hero",
  templateUrl: "./hello-hero.component.html",
  styleUrls: ["./hello-hero.component.css"]
})

export class HelloHeroComponent implements OnInit {

  hero: Hero;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private heroService: HeroService,
              private authService: AuthenticationService) {}


  ngOnInit(): void {
    this.showMyHero();
  }


  showMyHero(): void {
    this.route.params
        .switchMap((params: Params) =>
            this.heroService.getHero(params["id"]))
        .subscribe((hero: Hero) => this.hero = hero);
  }

  gotoDetail(): void {
    this.authService.isLoggedIn() ?
        this.router.navigate(["/management", this.hero.id]) :
        this.router.navigate(["/detail", this.hero.id]);
  }

}

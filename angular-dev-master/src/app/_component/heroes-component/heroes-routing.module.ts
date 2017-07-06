import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HelloHeroComponent } from "./heroes-preview/hello-hero.component";
import { HeroesComponent } from "./heroes-list/heroes.component";


const heroRoutes: Routes = [
  {
    path: "heroes",
    children: [
      {
        path: "",
        component: HeroesComponent,
        children: [
          {
            path: ":id", component: HelloHeroComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(heroRoutes) ],
  exports: [ RouterModule ]
})


export class HeroRoutingModule {}

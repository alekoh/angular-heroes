import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./_component/dashboard-component/dashboard.component";
import { HeroDetailComponent } from "./_component/hero-detail-component/hero-detail.component";

import { LoginComponent } from "./_component/admin-component/login-component/login.component";
import { AuthGuard } from "./_service/auth-service/auth.guard";
import { RegisterComponent } from "./_component/admin-component/register-component/register.component";
import { HiddenHeroesComponent } from "./_component/management-heroes-component/manage-heroes.component";
import { UsersComponent } from "./_component/users-component/users-component.component";
import { RedirectComponent } from "./_component/helper-component/redirect.component";


const routes: Routes = [

    { path: "", redirectTo: "/dashboard", pathMatch: "full" },

    { path: "dashboard",  component: DashboardComponent },

    { path: "detail/:id", component: HeroDetailComponent },

    { path: "login", component: LoginComponent },

    { path: "register", component: RegisterComponent },

    { path: "hidden", component: HiddenHeroesComponent, canActivate: [AuthGuard] },

    { path: "management/:id", component: HeroDetailComponent, canActivate: [AuthGuard] },

    { path: "code", component: RedirectComponent,

        children: [
            {
                path: ":fbToken", component: RedirectComponent
            }
        ]},

    { path: "users", component: UsersComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})


export class AppRoutingModule {}


// Modules
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import {  FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { HeroRoutingModule } from "./_component/heroes-component/heroes-routing.module";
import { AppRoutingModule } from "./app.routing.module";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { FacebookModule } from "ng2-facebook-sdk";
import { MaterialModule, MdButtonModule, MdCheckboxModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// Services
import { InMemoryDataService } from "./_service/fake-backend/in-memory-data.service";
import { HeroService } from "./_service/hero-service/hero.service";
import { AuthenticationService } from "./_service/auth-service/auth.service";
import { AuthGuard } from "./_service/auth-service/auth.guard";
import { UserService } from "./_service/user-service/user.service";

// Components
import { RegisterComponent } from "./_component/admin-component/register-component/register.component";
import { AppComponent } from "./_component/app-component/app.component";
import { HeroDetailComponent } from "./_component/hero-detail-component/hero-detail.component";
import { HeroesComponent } from "./_component/heroes-component/heroes-list/heroes.component";
import { DashboardComponent } from "./_component/dashboard-component/dashboard.component";
import { HeroSearchComponent } from "./_component/hero-search-component/hero-search.component";
import { HelloHeroComponent } from "./_component/heroes-component/heroes-preview/hello-hero.component";
import { HeroesComponentMain } from "./_component/heroes-component/main-heroes.component";
import { LoginComponent } from "./_component/admin-component/login-component/login.component";
import { HiddenHeroesComponent } from "./_component/management-heroes-component/manage-heroes.component";
import { UsersComponent } from "./_component/users-component/users-component.component";
import {RedirectComponent} from "./_component/helper-component/redirect.component";

import {ColorDirective} from "./_directive/color.directive";
import { HighlightDirective } from "./_directive/highlight.directive";

// Fake backend
import { fakeBackendProvider } from "./_service/fake-backend/fake-backend";
import { MockBackend, MockConnection } from "@angular/http/testing";
import { BaseRequestOptions } from "@angular/http";

// Pipes
import { SanitizeHtml } from "app/_pipe/sanitize";

// External
import "hammerjs";


@NgModule( {
    declarations: [
        AppComponent,
        HeroDetailComponent,
        HeroesComponent,
        DashboardComponent,
        HeroSearchComponent,
        HelloHeroComponent,
        HeroesComponentMain,
        LoginComponent,
        RegisterComponent,
        UsersComponent,
        HiddenHeroesComponent,
        RedirectComponent,

        HighlightDirective,
        ColorDirective,
        SanitizeHtml
    ],

    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        MdButtonModule,
        MdCheckboxModule,
        AppRoutingModule,
        HeroRoutingModule,
        HttpModule,
        FormsModule,

        // Including the ReactiveFormsModule in our application
        ReactiveFormsModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService, {passThruUnknownUrl: true}),
        FacebookModule.forRoot()
    ],

    providers: [
        HeroService,
        AuthenticationService,
        AuthGuard,
        UserService,

        // Fake backend
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions,
    ],


    bootstrap: [AppComponent],
} )
export class AppModule {
}

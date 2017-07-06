/**
 * Created by aleksandar.mechkaros on 5/10/2017.
 */

import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import "rxjs/add/operator/switchMap";
import {AuthenticationService} from "app/_service/auth-service/auth.service";

@Component({
    selector: "app-redirect",
    templateUrl: "./redirect.component.html"
})

export class RedirectComponent implements OnInit {

    code: string;
    fbToken: string;

    constructor(private route: ActivatedRoute,
                private authService: AuthenticationService) { }

    ngOnInit(): void {

        this.route.queryParams
            .subscribe(params => {
                this.code = params["code"];
                this.fbToken = params["fbToken"];
            });


        if (this.code === undefined) {
            this.authService.fbLogin(this.fbToken);
        } else {
            this.authService.exchangeCodeForToken(this.code);
        }
    }


}


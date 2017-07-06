
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import {AuthenticationService} from "app/_service/auth-service/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html"
})

export class LoginComponent {
    form: FormGroup;
    body = "";

    constructor(public authService: AuthenticationService,
                private router: Router,
                private formBuilder: FormBuilder) {

        this.form = formBuilder.group({
            "username": ["", Validators.required],
            "password": ["", Validators.compose([Validators.required, Validators.minLength(6)])]
        });
    }

    onSubmit() {
        this.authService.login();
    }


    appLogin(user: any) {
        this.authService.appLogin(user)
            .subscribe((res) => {
                this.router.navigate(["/dashboard"]);
            })
    }

}

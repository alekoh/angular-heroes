import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { UserService } from "app/_service/user-service/user.service";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {User} from "app/_model/user";

@Component({
    selector: "register",
    templateUrl: "register.component.html",
    styleUrls: ["register.component.css"]
})

export class RegisterComponent {
    form: FormGroup;
    users: User[];

    constructor(
        private router: Router,
        private userService: UserService,
        private fb: FormBuilder) {

        this.form = fb.group({
            "fname": [null, Validators.required],
            "lname" : [null, Validators.required],
            "username" : [null, Validators.compose([Validators.required, Validators.minLength(4)])],
            "password" : [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(13)])]
        });
    }

    add(user: User): void {
        this.userService.create(user)
            .subscribe((res) => {
                this.router.navigate(["/login"]);
            })
    }

}

/** Created by alekoh **/

import {Component, OnInit} from "@angular/core";
import { AuthenticationService } from "app/_service/auth-service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: "my-app",
  templateUrl: "./app-component.html",
  styleUrls: ["./app-component.css"]
})

export class AppComponent implements OnInit {
  title = "Tour of Heroes";


  constructor(public authService: AuthenticationService,
              private router: Router) { }


  ngOnInit(): void {
  }


  logout() {
    this.authService.logout();
    this.router.navigate(["/dashboard"]);
  }




}

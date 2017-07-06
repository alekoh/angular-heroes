import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthenticationService } from "app/_service/auth-service/auth.service";
import {UserService} from "app/_service/user-service/user.service";
import {User} from "app/_model/user";

@Component({
  selector: "users",
  templateUrl: "./users-component.component.html",
  styleUrls: ["./users-component.component.css"],
})


export class UsersComponent implements OnInit {
  selectedUser: User;
  users: User[];
  token: string;

  constructor(private userService: UserService,
              private router: Router
  ) { }

  getUsers(): void {
    this.userService.getAll()
      .subscribe(users => this.users = users);
  }

  ngOnInit(): void {
    this.getUsers();
  }

  manageDetails(user: User): void {
    this.selectedUser = user;
    this.router.navigate(["/users", user._id]);
  }


  delete(user: User): void {
    this.userService
      .delete(user._id).subscribe(
        user => console.log("User " + user.firstName + " deleted")
    );
  }



}

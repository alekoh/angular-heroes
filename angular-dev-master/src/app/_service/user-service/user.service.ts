import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response, URLSearchParams } from "@angular/http";

import { User } from "app/_model/user";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserService {
    private usersUrl = "http://localhost:8000/users";  // URL to web api
    private headers = new Headers({"Content-Type": "application/x-www-form-urlencoded"});
    private options = new RequestOptions({ headers: this.headers });
    private body = new URLSearchParams();

    constructor(private http: Http) { }

    getAll() {
        return this.http
            .get(this.usersUrl)
            .map(response => response.json() as User[]);
    }

    getById(id: string) {
        return this.http
            .get(this.usersUrl + id)
            .map((response: Response) => response.json());
    }

    create(user: User): Observable<any> {

        this.body.set("firstName", user.fname);
        this.body.set("lastName", user.lname);
        this.body.set("username", user.username);
        this.body.set("password", user.password);

        return this.http
            .post(this.usersUrl, this.body, this.options)
            .map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http
            .put(this.usersUrl + user._id, user)
            .map((response: Response) => response.json());
    }

    delete(id: string) {
        return this.http
            .delete(this.usersUrl + id)
            .map((response: Response) => response.json());
    }

}

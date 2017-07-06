import { Injectable } from "@angular/core";
import {Headers, Http, RequestOptions, URLSearchParams} from "@angular/http";

import "rxjs/add/operator/toPromise";

import { Hero } from "app/_model/hero";
import {Observable} from "rxjs/Observable";

@Injectable()
export class HeroService {
    private heroesUrl = "http://localhost:8000/heroes";  // URL to web api
    private headers = new Headers({"Content-Type": "application/x-www-form-urlencoded"});
    private options = new RequestOptions({ headers: this.headers });
    private body = new URLSearchParams();

    constructor(private http: Http) {}

    getHeroes(): Observable<any> {
        console.log("Called getHeroes");
        return this.http.get(this.heroesUrl)
            .map(res => res.json());
    }

    getHero(id: number): Observable<any> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get(url)
            .map(response => response.json()[0]);
    }

    update(hero: Hero): Promise<any> {
        const url = `${this.heroesUrl}/${hero.id}`;
        this.body.set("name", hero.name);
        this.body.set("token", sessionStorage.getItem("token"));
        return this.http
            .put(url, this.body, this.options)
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    create(name: string): Promise<any> {
        console.log(name);
        this.body.set("name", name);
        this.body.set("token", sessionStorage.getItem("token"));

        const url = `${this.heroesUrl}`;
        return this.http
            .post(url, this.body, this.options)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    delete(id: number): Promise<any> {
        const token = sessionStorage.getItem("token");

        const url = `${this.heroesUrl}/${id}/${token}`;
        return this.http
            .delete(url)
            .toPromise()
            .then(() => null);
    }

    private handleError(error: any): Promise<any> {
        console.error("An error has occured", error);
        return Promise.reject(error.message || error);
    }

}

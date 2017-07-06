import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { Hero } from "app/_model/hero";

@Injectable()
export class HeroSearchService {

  constructor( private http: Http ) { }


  search( term: string ): Observable<Hero[]> {
    return this.http
      .get( "http://localhost:8000/search/" + term )
      .map(response => response.json() as Hero[]);

  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';

@Injectable()
export class flightService {
   private _eventUrl = "http://localhost:5085/api/gatway/search-Flight";
    constructor(private http: HttpClient) {
      
    }
    getFlightDetails(flight:any) {
        
        debugger;
        return this.http.post<any>(this._eventUrl, flight)
        
    } 
}
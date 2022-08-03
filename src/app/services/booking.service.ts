import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';

@Injectable()
export class BookingService {
    private _eventUrl = "http://localhost:5085/api/gatway/Book-Flights";
   
    constructor(private http: HttpClient) {
      
    }
    PostBookingDetails(BookingDeatils:any) {
       
        debugger;
        return this.http.post<any>(this._eventUrl, BookingDeatils)
        
    } 
}
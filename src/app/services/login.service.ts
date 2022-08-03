import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { Injectable } from '@angular/core';
import { UserData } from '../models/UserData';

@Injectable()
export class AuthService {
   private _registerUrl ="http://localhost:5085/api/gatway/UserRegistration";
    private _loginUrl ="http://localhost:5085/api/gatway/UserLogin";
    constructor(private http: HttpClient, private _router: Router) {

    }

    loginUser(user: any) {
        debugger;
        return this.http.post<any>(this._loginUrl, user)
    }

    registerUser(user: any) {
        console.log(user);
        return this.http.post<any>(this._registerUrl, user)
    }

    logoutUser() {
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        localStorage.removeItem('role')
        localStorage.removeItem('userID')
        this._router.navigate(['/home'])
    }

    getToken() {
        return localStorage.getItem('token')
    }
    loggedIn() {
        return !!localStorage.getItem('token')
    }
}
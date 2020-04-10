import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { tokenNotExpired } from "angular2-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;

  constructor(private http: HttpClient) { }

  registerUser(user) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post('http://localhost:5000/users/register', user, { headers: headers }).pipe(map((res: any) => res));
  }

  authenticateUser(user) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post('http://localhost:5000/users/authenticate', user, { headers: headers }).pipe(map((res: any) => res));
  }

  getProfile() {
    this.loadToken();
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(this.authToken);
    headers.append('Authorization',this.authToken);
    return this.http.get('http://localhost:5000/users/profile', { headers: headers }).pipe(map((res: any) => res));
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    return true;
  }
  
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}

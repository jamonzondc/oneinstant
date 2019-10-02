import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


import { User } from '../../model/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';



@Injectable({ providedIn: 'root' })
export class SiginService {

 // private currentUserSubject: BehaviorSubject<User>;
 // public currentUser: Observable<User>;


  constructor(private httpClient: HttpClient, private jwtHelp: JwtHelperService) {
    //this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('jwt')));
    //this.currentUser = this.currentUserSubject.asObservable();
  }
  /* public get currentUserValue(): User {
    return this.currentUserSubject.value;
  } */

  getDataUser(): User {

    let token = localStorage.getItem('jwt');
    const decodedToken = this.jwtHelp.decodeToken(token);
    let user: User =null;
    /* {
      id: decodedToken.id,
      username: decodedToken.username,
      password: decodedToken.password,
      fullname: decodedToken.fullname,
      male:decodedToken.male,
      image: decodedToken.image
   
    };*/

    return user;
  }

  getToken(): string {
    return localStorage.getItem('jwt');
  }
  guest(): Observable<any> {
    return this.httpClient.get(`http://localhost:8080/auth/guest`);
  }


  login(login: any): Observable<any> {
    const httpHeader = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`http://localhost:8080/auth/signin`, login, { headers: httpHeader })
    
   /*  return this.httpClient.post<any>(`http://localhost:8080/auth/signin`,login, { headers: httpHeader })
    .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('jwt', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
    })); */

  }

  isAuthenticated(): boolean {
    let jwt = localStorage.getItem('jwt');
    return jwt != null;
  }


  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('jwt');
   // this.currentUserSubject.next(null);
  }
}

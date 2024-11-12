import { inject, Injectable, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { LoginUser } from '../../shared/models/loginuser.model';
import LoginApiResponse from '../../shared/models/login_api_response.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/models/user.model copy';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  baseURL = environment.API_Prefix;

  private httpService = inject(HttpClient);


  loggedInUserID = signal<string>("");
  loggedInUserName = signal<string>("");
  loggedInUserRoleName = signal<string>("");


  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token; 
  }

  setAuthSignals(){

    let userID = this.getUserId();
    let userFullName = this.getUsername();
    let userRoleName = this.getUserRoleName();
    
    if (userID!=null){
      this.loggedInUserID.set(userID); 
    }

    if (userFullName!=null){
      this.loggedInUserName.set(userFullName); 
    }

    if (userRoleName!=null){
      this.loggedInUserRoleName.set(userRoleName); 
    }

  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

 
  getDecodedToken(): any {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  getUserId(): string | null {
    const decodedToken = this.getDecodedToken();
    if (decodedToken && decodedToken.userID) {
      return decodedToken.userID; 
    }
    return null;
  }

 
  getUsername(): string | null {
    const decodedToken = this.getDecodedToken();
    if (decodedToken && decodedToken.fullName) {
      return decodedToken.fullName; 
    }
    return null;
  }

  
  getUserRoleName(): string | null {
    const decodedToken = this.getDecodedToken();
    if (decodedToken && decodedToken.roleName) {
      return decodedToken.roleName; 
    }
    return null;
  }

  
  isAdmin(): boolean {
    const role = this.getUserRoleName();
    return role === 'Admin'; 
  }



  logIn(data:LoginUser): Observable<LoginApiResponse> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json' 
    });
    
    return this.httpService.post<LoginApiResponse>(`${this.baseURL}auth/login`,data,{ headers })
    .pipe(tap(this.storeAuthToken.bind(this)));


  }

  private storeAuthToken(userData: LoginApiResponse) {

    


    if (userData.data.authToken!=null){
       

        localStorage.setItem('authToken', userData.data.authToken);
    
    }
    else{

      localStorage.removeItem('authToken');
     
    }

    
   
  }

 

    logout() {
      localStorage.removeItem('authToken');
      this.loggedInUserID.set(""); 
      this.loggedInUserName.set(""); 
      this.loggedInUserRoleName.set("");     
    }

}
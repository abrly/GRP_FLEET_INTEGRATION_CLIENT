import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGaurd implements CanActivate {
  constructor(private router: Router, private authService: AuthService,private dataService:DataService) {}

  
  canActivate() {
    if (this.authService.isAuthenticated()) {

      this.authService.setAuthSignals();

      this.dataService.fetchLpoRef.set("");

      return true;
      
    } else {
      return this.router.navigateByUrl('/session/sign-in');
    }
  }
}
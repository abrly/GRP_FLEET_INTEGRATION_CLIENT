import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGaurd implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  
  canActivate() {
    if (this.authService.isAuthenticated()) {

      this.authService.setAuthSignals();

      return true;
      
    } else {
      return this.router.navigateByUrl('/session/sign-in');
    }
  }
}
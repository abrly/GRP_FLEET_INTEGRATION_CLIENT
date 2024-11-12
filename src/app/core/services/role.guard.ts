import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService,private router:Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

       let bIsAllowed: boolean =false;

       let routeRolesData : string[] = next.data["roles"];

       routeRolesData.forEach((e)=>{

            if (this.authService.loggedInUserRoleName()==e){
                bIsAllowed = true;
            }

       });   

       if (bIsAllowed){
         return true;
       }
       else{
        this.router.navigate(['/not-found']);
        return false;
    
       }

      
  }
}

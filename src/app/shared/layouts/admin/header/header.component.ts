import { Component, effect, inject} from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { DataService } from '../../../../core/services/data.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule ,MatToolbar,MatIcon,MatButtonModule,MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent  {

  private dataService = inject(DataService);

  private authService = inject(AuthService);

  toggleSidebar() {

      let drawerStatus = this.dataService.drawerStatus();
     
      this.dataService.setDrawerStatus(!drawerStatus)
     
  }

  loggedInUserGreetings= ` Hi!  ${this.authService.loggedInUserName()} ` 


  constructor(private router: Router){

    
    effect(() => {

      this.loggedInUserGreetings= ` Hi!  ${this.authService.loggedInUserName()} ` 

    
    }); 



  }

  onLogout(){

    this.authService.logout();

    this.router.navigateByUrl('/session/sign-in');


  }


}

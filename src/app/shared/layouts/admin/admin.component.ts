import { Component, computed, effect, inject } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FooterComponent } from '../footer/footer.component';

import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule,HeaderComponent,SidenavComponent,MatSidenavModule,FooterComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent   {

  private dataService = inject(DataService);

  opened:boolean=true;
  
  constructor() {
    
    effect(() => {
      this.opened = this.dataService.drawerStatus();
    });
  }
 
}

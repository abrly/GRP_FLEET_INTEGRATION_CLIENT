import { Component, computed, inject } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { DataService } from '../../../../core/services/data.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule ,MatToolbar,MatIcon,MatButtonModule,MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  private dataService = inject(DataService);

  toggleSidebar() {

      let drawerStatus = this.dataService.drawerStatus();
     
      this.dataService.setDrawerStatus(!drawerStatus)
     
  }

}

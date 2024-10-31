import { Component, inject, OnInit } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import Menu from '../../../models/menu.model';

import { RouterModule } from '@angular/router'; // Import RouterModule
import { DataService } from '../../../../core/services/data.service';

import { MatExpansionPanel,MatExpansionPanelHeader,MatExpansionPanelTitle } from '@angular/material/expansion';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule,MatListModule,MatIcon,MatExpansionPanel,MatExpansionPanelHeader,MatExpansionPanelTitle],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit {

  private dataService = inject(DataService);
  private authService = inject(AuthService);

  menuItems: { group: string, items: Menu[] }[] = [];
 
  

  ngOnInit(): void {
    
    if (this.authService.getUserRoleName()=="Admin"){

      this.menuItems = [
        {
          group: 'GRP Postings',
          items: [
            { label: 'Receipts', icon: 'receipt', route: '/export/receipt' , title:'GRP Postings - Receipts' },      
            { label: 'Commercials', icon: 'account_balance', route: '/export/cmls'  , title:'GRP Postings - Commercials'  }, 
            { label: 'Receipt Returns', icon: 'flip_to_back', route: '/export/receipt_returns'  , title:'GRP Postings - Receipt Returns'  }           
          ]
        },
        {
          group: 'Reset GRP Postings',
          items: [
            { label: 'Reset Receipts', icon: 'receipt', route: '/reset/reset_receipt' , title:'Reset GRP Postings - Receipts ' },
            { label: 'Reset Commercials', icon: 'account_balance', route: '/reset/reset_cmls' , title:'Reset GRP Postings - Commercials' },
            { label: 'Reset Receipt Returns', icon: 'flip_to_back', route: '/reset/reset_receipt_returns' , title:'Reset GRP Postings - Receipt Returns' }     
          ]
        },
        {
          group: 'Utility',
          items: [
            { label: 'Activity Log', icon: 'track_changes', route: '/logs' , title:'Activity Log' }      
          ]
        }
      ];
    

    }
    else{

      this.menuItems = [
        {
          group: 'GRP Postings',
          items: [
            { label: 'Receipts', icon: 'receipt', route: '/export/receipt' , title:'Receipt GRP Postings' },      
            { label: 'Commercials', icon: 'account_balance', route: '/export/cmls'  , title:'Commercial GRP Postings'  }, 
            { label: 'Receipt Returns', icon: 'flip_to_back', route: '/export/receipt_returns'  , title:'Receipt Returns GRP Postings'  }           
          ]
        },
        {
          group: 'Utility',
          items: [
            { label: 'Activity Log', icon: 'track_changes', route: '/logs' , title:'Activity Log' }      
          ]
        }
      ];

    }

  }
  


  onMenuClick(menu:string){
    this.dataService.fetchLpoRef.set("");
    this.dataService.setActiveMenu(menu);
    this.dataService.fetchLogSelectionDone.set(false);
  }

}

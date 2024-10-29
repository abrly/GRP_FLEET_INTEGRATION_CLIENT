import { Component, inject } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import Menu from '../../../models/menu.model';

import { RouterModule } from '@angular/router'; // Import RouterModule
import { DataService } from '../../../../core/services/data.service';

import { MatExpansionPanel,MatExpansionPanelHeader,MatExpansionPanelTitle } from '@angular/material/expansion';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule,MatListModule,MatIcon,MatExpansionPanel,MatExpansionPanelHeader,MatExpansionPanelTitle],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {

  private dataService = inject(DataService);


  /*menuItems: Menu[] = [

    { label: 'Export LPO Receipts', icon: 'house', route: '/export/receipt' },
    { label: 'Reset LPO Receipts', icon: 'settings', route: '/reset/reset_receipt' },
    { label: 'Export LPO CMLs', icon: 'house', route: '/export/cmls' },
    { label: 'Reset LPO CMLs', icon: 'settings', route: '/reset/reset_cmls' },
    { label: 'Profile', icon: 'person', route: '/profile' },
    { label: 'Orders', icon: 'shopping_cart', route: '/orders' },
    { label: 'Reports', icon: 'assessment', route: '/reports' },
    { label: 'Help', icon: 'help', route: '/help' }
   
  ];*/

  menuItems: { group: string, items: Menu[] }[] = [
    {
      group: 'GRP Postings',
      items: [
        { label: 'Receipts', icon: 'house', route: '/export/receipt' , title:'GRP Postings - LPO Receipts' },      
        { label: 'Commercials', icon: 'house', route: '/export/cmls'  , title:'GRP Postings - LPO Commercials'  }, 
        { label: 'Receipt Returns', icon: 'house', route: '/export/receipt_returns'  , title:'GRP Postings - LPO Receipt Returns'  }           
      ]
    },
    {
      group: 'Reset GRP Postings',
      items: [
        { label: 'Reset Receipts', icon: 'settings', route: '/reset/reset_receipt' , title:'Reset GRP Postings - LPO Receipts' },
        { label: 'Reset Commercials', icon: 'settings', route: '/reset/reset_cmls' , title:'Reset GRP Postings - LPO Commercials' },
        { label: 'Reset Receipt Returns', icon: 'settings', route: '/reset/reset_receipt_returns' , title:'Reset GRP Postings - LPO Receipt Returns' }     
      ]
    },
    {
      group: 'Logs',
      items: [
        { label: 'Logs', icon: 'settings', route: '/logs' , title:'Logs' }      
      ]
    }
  ];
  


  onMenuClick(menu:string){
    this.dataService.fetchLpoRef.set("");
    this.dataService.setActiveMenu(menu);
  }

}

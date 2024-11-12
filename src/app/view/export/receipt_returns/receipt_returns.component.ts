import { Component, effect, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LpoSearchComponent } from '../../../shared/components/lpo_search/lpo_search.component';
import { GoExportReceiptReturnsComponent } from './go_export_receipt_returns/go_export_receipt_returns.component';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-lpo_receipt_returns',
  standalone: true,
  imports: [MatCardModule,LpoSearchComponent,GoExportReceiptReturnsComponent],
  templateUrl: './receipt_returns.component.html',
  styleUrl: './receipt_returns.component.css'
})
export class LpoReceiptReturnsComponent implements OnInit {

  LpoRef:string="";

  private dataService = inject(DataService);

  constructor(){

    
    effect(() => {

      this.LpoRef = this.dataService.fetchLpoRef();
    

    }); 

  }

  ngOnInit(): void {
    this.dataService.selectedMenu.set("GRP Postings - Receipt Returns");
    this.dataService.postingTypeId.set("3");
    this.dataService.isReset.set("0");
  }

  
  get activeMenu(){
    return this.dataService.selectedMenu();
   }


}

import { Component, effect, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LpoSearchComponent } from '../../../shared/components/lpo_search/lpo_search.component';
import { GoResetReceiptReturnsComponent } from './go-reset-receipt-returns/go-reset-receipt-returns.component';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'reset-receipt-returns',
  standalone: true,
  imports: [MatCardModule, LpoSearchComponent, GoResetReceiptReturnsComponent],
  templateUrl: './reset_receipt_returns.component.html',
  styleUrl: './reset_receipt_returns.component.css'
})
export class ResetReceiptReturnsComponent implements OnInit {

  LpoRef:string="";

  private dataService = inject(DataService);

  constructor(){

    
    effect(() => {

      this.LpoRef = this.dataService.fetchLpoRef();
    

    }); 

  }


  ngOnInit(): void {
    this.dataService.selectedMenu.set("Reset GRP Postings - Receipt Returns");
    this.dataService.postingTypeId.set("3");
    this.dataService.isReset.set("1");
  }

  
  get activeMenu(){
    return this.dataService.selectedMenu();
   }




}

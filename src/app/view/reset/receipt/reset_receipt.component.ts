import { Component, effect, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LpoSearchComponent } from '../../../shared/components/lpo_search/lpo_search.component';
import { GoResetReceiptComponent } from './go-reset-receipt/go-reset-receipt.component';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'reset-receipt',
  standalone: true,
  imports: [MatCardModule, LpoSearchComponent, GoResetReceiptComponent],
  templateUrl: './reset_receipt.component.html',
  styleUrl: './reset_receipt.component.css'
})
export class ResetReceiptComponent implements OnInit {

  LpoRef:string="";

  private dataService = inject(DataService);

  constructor(){

    
    effect(() => {

      this.LpoRef = this.dataService.fetchLpoRef();

     
    

    }); 

  }

  ngOnInit(): void {
    this.dataService.selectedMenu.set("Reset GRP Postings - Receipts");
    this.dataService.postingTypeId.set("1");
    this.dataService.isReset.set("1");
  }


  
  get activeMenu(){
    return this.dataService.selectedMenu();
   }




}

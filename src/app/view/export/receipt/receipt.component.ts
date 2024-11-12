import { Component,  effect, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LpoSearchComponent } from '../../../shared/components/lpo_search/lpo_search.component';
import { GoExportReceiptComponent } from './go_export_receipt/go_export_receipt.component';
import { DataService } from '../../../core/services/data.service';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-lpo',
  standalone: true,
  imports: [MatCardModule,LpoSearchComponent,GoExportReceiptComponent,MatToolbarModule],
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.css'
})
export class LpoReceiptComponent implements OnInit {

  LpoRef:string="";

  
  private dataService = inject(DataService);

  constructor(){

    
    effect(() => {

      this.LpoRef = this.dataService.fetchLpoRef();
    

    }); 

  }


  ngOnInit(): void {
    this.dataService.selectedMenu.set("GRP Postings - Receipts");
    this.dataService.postingTypeId.set("1");
    this.dataService.isReset.set("0");
  }
  
  get activeMenu(){
    return this.dataService.selectedMenu()??"Receipt GRP Postings";
   }

}

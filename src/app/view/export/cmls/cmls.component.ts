import { Component, effect, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LpoSearchComponent } from '../../../shared/components/lpo_search/lpo_search.component';
import { DataService } from '../../../core/services/data.service';
import { GoExportCmlsComponent } from './go-export-cmls/go-export-cmls.component';

@Component({
  selector: 'app-export-cmls',
  standalone: true,
  imports: [MatCardModule,LpoSearchComponent,GoExportCmlsComponent],
  templateUrl: './cmls.component.html',
  styleUrl: './cmls.component.css'
})
export class CmlsComponent implements OnInit {

  LpoRef:string="";

  private dataService = inject(DataService);

  constructor(){

    
    effect(() => {

      this.LpoRef = this.dataService.fetchLpoRef();
    

    }); 

  }

  ngOnInit(): void {
    this.dataService.selectedMenu.set("GRP Postings - Commercials");
    this.dataService.postingTypeId.set("2");
    this.dataService.isReset.set("0");
  }

  
  get activeMenu(){
    return this.dataService.selectedMenu();
   }


}

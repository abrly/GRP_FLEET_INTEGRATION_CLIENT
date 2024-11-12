import { Component, effect, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LpoSearchComponent } from '../../../shared/components/lpo_search/lpo_search.component';
import { DataService } from '../../../core/services/data.service';
import { GoResetCmlsComponent } from './go-reset-cmls/go-reset-cmls.component';

@Component({
  selector: 'app-reset-cmls',
  standalone: true,
  imports: [MatCardModule, LpoSearchComponent,GoResetCmlsComponent ],
  templateUrl: './reset_cmls.component.html',
  styleUrl: './reset_cmls.component.css'
})
export class ResetCmlsComponent implements OnInit {

  LpoRef:string="";

  private dataService = inject(DataService);

  constructor(){

    
    effect(() => {

      this.LpoRef = this.dataService.fetchLpoRef();
    

    }); 

  }

  ngOnInit(): void {
    this.dataService.selectedMenu.set("Reset GRP Postings - Commercials");
    this.dataService.postingTypeId.set("2");
    this.dataService.isReset.set("1");
  }
  
  get activeMenu(){
    return this.dataService.selectedMenu();
   }


}

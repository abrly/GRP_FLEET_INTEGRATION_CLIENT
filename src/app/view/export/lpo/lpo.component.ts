import { Component, effect, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LpoSearchComponent } from './lpo_search/lpo_search.component';
import { LpoExportComponent } from './lpo-export/lpo-export.component';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-lpo',
  standalone: true,
  imports: [MatCardModule,LpoSearchComponent,LpoExportComponent],
  templateUrl: './lpo.component.html',
  styleUrl: './lpo.component.css'
})
export class LpoComponent {

  LpoRef:string="";

  private dataService = inject(DataService);

  constructor(){

    
    effect(() => {

      this.LpoRef = this.dataService.fetchLpoRef();
    

    }); 

  }



}

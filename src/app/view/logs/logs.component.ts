import { Component, effect, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SearchlogComponent } from './searchlog/searchlog.component';
import { ViewlogsComponent } from './viewlogs/viewlogs.component';
import { DataService } from '../../core/services/data.service';


@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [MatCardModule,SearchlogComponent,ViewlogsComponent],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css'
})
export class LogsComponent implements OnInit {

  

  private dataService = inject(DataService);

  fromdate:string | null = this.dataService.fetchLogFromDt();
  todate:string | null = this.dataService.fetchLogToDt();
  fetchLogSelectionDone:boolean =this.dataService.fetchLogSelectionDone();

  constructor(){

    
    effect(() => {

      this.fromdate = this.dataService.fetchLogFromDt();

      this.todate = this.dataService.fetchLogToDt();

      this.fetchLogSelectionDone=this.dataService.fetchLogSelectionDone();
    

    }); 

  }


  ngOnInit(): void {
    this.dataService.selectedMenu.set("Utility - Activity Log");
    
  }

  get activeMenu(){
    return this.dataService.selectedMenu();
   }



}

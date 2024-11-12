
import {Component, ViewChild, AfterViewInit, inject, effect, DestroyRef, OnInit } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {merge, of as observableOf, Subscription} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {DatePipe,registerLocaleData} from '@angular/common';

import { DataService } from '../../../core/services/data.service';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import {MatCheckboxModule} from '@angular/material/checkbox';

import {  ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';


import { MatNativeDateModule } from '@angular/material/core';

import { MatDialog } from '@angular/material/dialog';

import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerComponent } from 'ngx-spinner';
import Log from '../../../shared/models/log.model';
import { MessageboxComponent } from '../../../shared/components/messagebox/messagebox.component';


import localeEn from '@angular/common/locales/en'; // Import the desired locale

registerLocaleData(localeEn);

@Component({
  selector: 'app-viewlogs',
  standalone: true,
  imports: [
    MatProgressSpinnerModule, 
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule, 
    DatePipe,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    NgxSpinnerComponent      
  ],
  templateUrl: './viewlogs.component.html',
  styleUrl: './viewlogs.component.css'
})
export class ViewlogsComponent implements OnInit,AfterViewInit {

  readonly dialog = inject(MatDialog);  

  readonly spinner = inject(NgxSpinnerService);


  private dataService = inject(DataService);


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  fromdate:string | null = null;
  todate:string | null = null;

  appMessageBoxClosed:boolean=this.dataService.appMessageDialogClosed();

  displayedColumns: string[] =  ['CreatedOn','CreatedBy','LogCategory','PostingTypeDescription', 'LPONo','RowId','PostingMainTrxID','Remarks'];
          
  pageSize=5;

  data: Log[] = [];
  
   
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

 
  constructor(){

    effect(() => {

      this.fromdate = this.dataService.fetchLogFromDt();

      this.todate = this.dataService.fetchLogToDt();
  
    }); 

  }

  ngOnInit(): void {

   
    this.data = [];
    
  }

    ngAfterViewInit() {     

               
        this.sort.sortChange.subscribe(() => {
          
          this.paginator.pageIndex = 0;
        
        });

     
        if (this.dataService.fetchLogCategory()=="GRP Postings"){

          merge(this.sort.sortChange, this.paginator.page)
          .pipe(
            startWith({}),
            switchMap(() => {
              this.isLoadingResults = true;
              return this.dataService!.getPostingLogs(
                this.dataService.fetchLogFromDt()??"",
                this.dataService.fetchLogToDt()??"",
                this.sort.active,
                this.sort.direction,
                this.paginator.pageIndex+1,
                this.pageSize,
                this.dataService.fetchLogPostingTypeId()??"ALL",
                this.dataService.fetchLogLpoRefNo()??"",
              ).pipe(catchError(() => observableOf(null)));
            }),
            map(data => {
              // Flip flag to show that loading has finished.
              
              this.isLoadingResults = false;
  
                          
              if (data === null) {
                return [];
              }
               
              this.resultsLength = data.totalItems;   
              
              console.log('what ma total item');

              console.log(this.resultsLength);

              console.log(data);
            
              return data.data;
            }),
          )
          .subscribe(data => {
            
            this.data = data;
            
  
            if (this.data.length==0){
  
  
              this.dataService.appMessageDialogContent.set(`No records found!`);
       
  
              this.dialog.open(MessageboxComponent, {
                "width":"400px",
                "enterAnimationDuration":"300ms",
                "exitAnimationDuration":"300ms",
              });
      
      
              this.dialog.afterAllClosed.subscribe(v => {
                
                this.dataService.fetchLogCriteria.set({fromdt:"",todt:""});
            
              });
  
  
            }
  
  
          });

        }else{


          merge(this.sort.sortChange, this.paginator.page)
          .pipe(
            startWith({}),
            switchMap(() => {
              this.isLoadingResults = true;
              return this.dataService!.getPostingResetLogs(
                this.dataService.fetchLogFromDt()??"",
                this.dataService.fetchLogToDt()??"",
                this.sort.active,
                this.sort.direction,
                this.paginator.pageIndex+1,
                this.pageSize,  
                this.dataService.fetchLogPostingTypeId()??"ALL",
                this.dataService.fetchLogLpoRefNo()??"",
              ).pipe(catchError(() => observableOf(null)));
            }),
            map(data => {
              // Flip flag to show that loading has finished.
              
              this.isLoadingResults = false;
  
              if (data === null) {
                return [];
              }
               
               this.resultsLength = data.totalItems;          
            
              return data.data;
            }),
          )
          .subscribe(data => {
            
            this.data = data;
            
  
            if (this.data.length==0){
  
  
              this.dataService.appMessageDialogContent.set(`No records found!`);
       
  
              this.dialog.open(MessageboxComponent, {
                "width":"400px",
                "enterAnimationDuration":"300ms",
                "exitAnimationDuration":"300ms",
              });
      
      
              this.dialog.afterAllClosed.subscribe(v => {
                
                this.dataService.fetchLogCriteria.set({fromdt:"",todt:""});
            
              });
  
  
            }
  
  
          });

        }


       
   

  }


}


import {Component, ViewChild, AfterViewInit, inject, effect} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule, SortDirection} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DatePipe} from '@angular/common';

import { DataService } from '../../../../core/services/data.service';
import LPO from '../../../../shared/models/lpo.model';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import {MatCheckboxModule} from '@angular/material/checkbox';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';


import { MatNativeDateModule } from '@angular/material/core';

import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-lpo-export',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule, DatePipe,MatInputModule,MatFormFieldModule,MatButtonModule,ReactiveFormsModule,MatDatepickerModule,MatNativeDateModule,MatCheckboxModule],
  templateUrl: './lpo-export.component.html',
  styleUrl: './lpo-export.component.css'
})
export class LpoExportComponent implements AfterViewInit {

  lpoPostingForm: FormGroup;

  private dataService = inject(DataService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  LpoRef:string="";

  displayedColumns: string[] = 
          ['select','LineNo','Status','RowId', 'SupplierNo','SupplierName','Returned',
            'PartNo','PartSuffix','QtyReceived','UnitPrice','OrderPrice','TotalCost',
            'VAT','TotalCostIncVAT','Reference','Location','DateReceived','DateInserted','Site','Invoiced'];
 

  pageSize=100;

  data: LPO[] = [];

  selection = new SelectionModel<LPO>(true, this.data);


   // Whether the number of selected elements matches the total number of rows
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.length;
    return numSelected === numRows;
  }

  // Selects all rows if they are not all selected; otherwise clear selection
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.data.forEach(row => this.selection.select(row));
  }

  // Checkbox label for the checkbox on the passed row
  checkboxLabel(row?: LPO): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  totalVATValue:number=0;
  totalInvoiceValue:number=0;
  totalInvoiceValueWithVAT:number=0;


  constructor(private fb: FormBuilder){

    this.lpoPostingForm = this.fb.group({
      postingDate: ['', Validators.required],
      invoiceNo: ['', Validators.required],
      remarks: ['', Validators.maxLength(100)],
    });
    
    effect(() => {

      this.LpoRef = this.dataService.fetchLpoRef();    

    }); 

  }

    ngAfterViewInit() {     

        console.log('ngAfterViewInit called');
       
        this.sort.sortChange.subscribe(() => {
          
          this.paginator.pageIndex = 0;
        
        });


        merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoadingResults = true;
            return this.dataService!.getPODetailsFromFleet(
              this.dataService.fetchLpoRef(),
              this.sort.active,
              this.sort.direction,
              this.paginator.pageIndex+1,
              this.pageSize
            ).pipe(catchError(() => observableOf(null)));
          }),
          map(data => {
            // Flip flag to show that loading has finished.
            
            this.isLoadingResults = false;

            console.log('wr data i receive now');

            console.log(data);
         
  
            if (data === null) {
              return [];
            }
             
            this.resultsLength = data.totalItems;          
            this.totalVATValue= data.totalVATValue;
            this.totalInvoiceValue=data.totalInvoiceValue;
            this.totalInvoiceValueWithVAT=data.totalInvoiceValueWithVAT;

            return data.data;
          }),
        )
        .subscribe(data => {
          
          this.data = data;
          this.selection = new SelectionModel<LPO>(true, this.data);

        });
   

  }

  onSubmit() {

    if (this.lpoPostingForm.valid) {
  
  
      const { postingDate,invoiceNo,remarks } = this.lpoPostingForm.value;


      const selectedRows = this.selection.selected;

      if (selectedRows!=null){

        selectedRows.forEach(r=>{



        });

      }
     
    
    }

}
  

}

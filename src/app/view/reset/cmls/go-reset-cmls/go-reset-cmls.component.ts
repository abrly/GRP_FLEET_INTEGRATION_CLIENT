import {Component, ViewChild, AfterViewInit, inject, effect, DestroyRef, OnInit } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {merge,  of as observableOf, Subscription} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DatePipe} from '@angular/common';

import { DataService } from '../../../../core/services/data.service';


import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import {MatCheckboxModule} from '@angular/material/checkbox';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';


import { MatNativeDateModule } from '@angular/material/core';

import { SelectionModel } from '@angular/cdk/collections';


import { MessageboxComponent } from '../../../../shared/components/messagebox/messagebox.component';

import { MatDialog } from '@angular/material/dialog';

import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerComponent } from 'ngx-spinner';
import CML from '../../../../shared/models/cml.model';
import Post_Cml_Line from '../../../../shared/models/post_cml_line.model';
import Post_Cml_Request from '../../../../shared/models/post_cml_request.model';
import Reset_Lpo_Request from '../../../../shared/models/reset_lpo_request.model';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-go-reset-cmls',
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
    NgxSpinnerComponent,
    CommonModule      
  ],
  templateUrl: './go-reset-cmls.component.html',
  styleUrl: './go-reset-cmls.component.css'
})
export class GoResetCmlsComponent implements OnInit,AfterViewInit {

  readonly dialog = inject(MatDialog);  

  readonly spinner = inject(NgxSpinnerService);

  cmlResetPostingForm: FormGroup;

  private dataService = inject(DataService);
  private authService = inject(AuthService);


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private subPostLPO!:Subscription;

  private destroyRef= inject(DestroyRef);
 

  LpoRef:string="";

  appMessageBoxClosed:boolean=this.dataService.appMessageDialogClosed();

  /*displayedColumns: string[] = 
          ['select','LineNo','Status','Cml_row_id', 'SupplierNumber','SupplierName','Job_Rowid','Site',
            'TaskID','Task_Description','TotalCost',
            'VAT','TotalCostWithVAT']; */

  displayedColumns: string[] = 
            ['select','LineNo', 'SupplierNumber','SupplierName','Site',
             'Task_Description','TotalCost',
              'VAT','TotalCostWithVAT'];
 

  pageSize=100;

  data: CML[] = [];

  selection = new SelectionModel<CML>(true, this.data);

  post_cml_line:Post_Cml_Line | undefined;

  post_cml_lines:Post_Cml_Line[] = [];

  post_cml_request:Post_Cml_Request | undefined;

  selectionLength = 0;

  reset_lpo_request:Reset_Lpo_Request | undefined;


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
  checkboxLabel(row?: CML): string {
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

    this.cmlResetPostingForm = this.fb.group({   
      remarks: ['', Validators.maxLength(100)],
    });
    
    effect(() => {

      this.LpoRef = this.dataService.fetchLpoRef(); 

    
    }); 

  }

  ngOnInit(): void {

   
    this.data = [];
    
  }

    ngAfterViewInit() {     

               
        this.sort.sortChange.subscribe(() => {
          
          this.paginator.pageIndex = 0;
        
        });


        merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoadingResults = true;
            return this.dataService!.getPODetailsFromFleet4ResetCMLsXport(
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

        
            if (data === null) {
              return [];
            }
             
            this.resultsLength = data.totalItems;          
            this.totalVATValue= data.totalVATValue;
            this.totalInvoiceValue=data.totalInvoiceValue;
            this.totalInvoiceValueWithVAT=data.totalInvoiceValueWithVAT;

            this.selectionLength= data.totalItems;

            return data.data;
          }),
        )
        .subscribe(data => {
          
          this.data = data;
          this.selection = new SelectionModel<CML>(true, this.data);

          /*
          
          if (this.data.length==0){


            this.dataService.appMessageDialogContent.set(`No items found; The CMLs# ${this.LpoRef} might have exported to GRP earlier`);
     

            this.dialog.open(MessageboxComponent, {
              "width":"400px",
              "enterAnimationDuration":"300ms",
              "exitAnimationDuration":"300ms",
            });
    
    
            this.dialog.afterAllClosed.subscribe(v => {
              
              this.dataService.fetchLpoRef.set("");
          
            });


          } */


         


        });
   

  }


  onCheckboxChange(event: any, row: any): void {
    if (event.checked) {
      // Checkbox is checked
      this.selection.toggle(row); // Manage selection state
    
      this.totalInvoiceValue +=row.TotalCost;
      this.totalVATValue +=row.VAT;
      this.totalInvoiceValueWithVAT+=row.TotalCostIncVAT;
      this.selectionLength +=1;


    } else {
      // Checkbox is unchecked
      this.selection.toggle(row); // Manage selection state
   

      this.totalInvoiceValue -=row.TotalCost;
      this.totalVATValue-=row.VAT;
      this.totalInvoiceValueWithVAT-=row.TotalCostIncVAT;
      this.selectionLength-=1;

    }
  }

  

  onSubmit() {

    this.spinner.show();

    if (this.cmlResetPostingForm.valid) {

     
      this.cmlResetPostingForm.disable();

      const selectedRows = this.selection.selected;
    

      let rowids = '';      

      if (selectedRows!=null){       

        selectedRows.forEach(r=>{

        rowids = rowids ? rowids + "," + r.Cml_row_id.toString() : r.Cml_row_id.toString();


        });

      }  
  
      const { remarks } = this.cmlResetPostingForm.value;

      this.reset_lpo_request = new Reset_Lpo_Request(
        this.LpoRef,
        remarks,
        this.authService.loggedInUserID(),
        rowids    
      );


      this.subPostLPO = this.dataService.resetCmls2GRP(this.reset_lpo_request).subscribe((resp)=>{


    
        this.spinner.hide();
       
        this.dataService.appMessageDialogContent.set(`The commercials for LPO# ${this.LpoRef} has been reset Successfully`);
     

        this.dialog.open(MessageboxComponent, {
          "width":"400px",
          "enterAnimationDuration":"300ms",
          "exitAnimationDuration":"300ms",
        });


        this.dialog.afterAllClosed.subscribe(v => {
          
          this.dataService.fetchLpoRef.set("");
      
        });
       

      
          

      });

      this.destroyRef.onDestroy(() => {
        this.subPostLPO.unsubscribe();
      });
     
    
    }

}

}

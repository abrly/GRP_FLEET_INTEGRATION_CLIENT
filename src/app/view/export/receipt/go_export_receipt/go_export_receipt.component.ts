
import {Component, ViewChild, AfterViewInit, inject, effect, DestroyRef, OnInit } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {merge, of as observableOf, Subscription} from 'rxjs';
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

import Post_Lpo_Request from '../../../../shared/models/post_lpo_request.model';
import Post_Lpo_Line from '../../../../shared/models/post_lpo_line.model';

import { MessageboxComponent } from '../../../../shared/components/messagebox/messagebox.component';

import { MatDialog } from '@angular/material/dialog';

import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'go-export-receipt',
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
  templateUrl: './go_export_receipt.component.html',
  styleUrl: './go_export_receipt.component.css'
 
})
export class GoExportReceiptComponent implements OnInit,AfterViewInit {

  readonly dialog = inject(MatDialog);  

  readonly spinner = inject(NgxSpinnerService);

  lpoPostingForm: FormGroup;

  private dataService = inject(DataService);

  private authService = inject(AuthService);



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private subPostLPO!:Subscription;

  private destroyRef= inject(DestroyRef);
 

  LpoRef:string="";

  appMessageBoxClosed:boolean=this.dataService.appMessageDialogClosed();

 /* displayedColumns: string[] = 
          ['select','LineNo','Status','RowId', 'SupplierNo','SupplierName','Returned',
            'PartNo','PartSuffix','PartDescription','PartKeyword','QtyReceived','UnitPrice','OrderPrice','TotalCost',
            'VAT','TotalCostIncVAT','Reference','Location','DateReceived','DateInserted','Site','Invoiced']; */


displayedColumns: string[] = 
            ['select','LineNo','SupplierNo','SupplierName','Returned',
              'PartNo','PartDescription','PartKeyword','QtyReceived','UnitPrice','TotalCost',
              'VAT','TotalCostIncVAT','Site'];
 

  pageSize=100;

  data: LPO[] = [];

  selection = new SelectionModel<LPO>(true, this.data);

  post_lpo_line:Post_Lpo_Line | undefined;

  post_lpo_lines:Post_Lpo_Line[] = [];

  post_lpo_request:Post_Lpo_Request | undefined;

  selectionLength = 0;


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

  hideTable:boolean=false;



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
            return this.dataService!.getPODetailsFromFleet4ReceiptXport(
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
          this.selection = new SelectionModel<LPO>(true, this.data);


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

    if (this.lpoPostingForm.valid) {

      this.lpoPostingForm.disable();

      const selectedRows = this.selection.selected;

      this.post_lpo_lines=[];

      let rowids = '';    
      
      let mergedLineDescs ='';

      if (selectedRows!=null){       

        selectedRows.forEach(r=>{

        rowids = rowids ? rowids + "," + r.RowId.toString() : r.RowId.toString();

        mergedLineDescs = mergedLineDescs ? mergedLineDescs + "," + r.PartKeyword + '-' + r.PartDescription : r.PartKeyword + '-' + r.PartDescription;

        this.post_lpo_lines.push(new Post_Lpo_Line(
          
            r.SupplierNo,
            r.SupplierName,
            r.LineNo,
            r.VAT,
            r.Site,
            r.TotalCost,
            r.RowId 
         
          ));


        });

      }
  
  
      const { postingDate,invoiceNo,remarks } = this.lpoPostingForm.value;

      this.post_lpo_request = new Post_Lpo_Request(
        this.LpoRef,
        postingDate,
        invoiceNo,
        this.totalInvoiceValue,
        this.totalVATValue,
        this.totalInvoiceValueWithVAT,
        remarks,
        this.authService.loggedInUserID(),
        rowids,
        mergedLineDescs.substring(0,235),      
        this.post_lpo_lines
      );

      console.log('what is te reqe');
      console.log(this.post_lpo_request);

      this.subPostLPO = this.dataService.postReceipts2GRP(this.post_lpo_request).subscribe((resp)=>{


        this.spinner.hide();
       
        this.dataService.appMessageDialogContent.set(`The LPO receipts LPO# ${this.LpoRef} has been exported to GRP successfully, export refererence is # ${resp.ReferenceNo.toString()} `);
     

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

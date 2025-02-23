import {Component, ViewChild, AfterViewInit, inject, effect, DestroyRef, OnInit } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {merge, of as observableOf, Subscription} from 'rxjs';
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
import { AuthService } from '../../../../core/services/auth.service';

import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-go-export-cmls',
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
  templateUrl: './go-export-cmls.component.html',
  styleUrl: './go-export-cmls.component.css'
})
export class GoExportCmlsComponent implements OnInit,AfterViewInit {

  readonly dialog = inject(MatDialog);  

  readonly spinner = inject(NgxSpinnerService);

  cmlPostingForm: FormGroup;

  private dataService = inject(DataService);
  private authService = inject(AuthService);


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private subPostLPO!:Subscription;

  private destroyRef= inject(DestroyRef);
 

  LpoRef:string="";

  appMessageBoxClosed:boolean=this.dataService.appMessageDialogClosed();

 /* displayedColumns: string[] = 
          ['select','LineNo','Status','Cml_row_id', 'SupplierNumber','SupplierName','Job_Rowid','Site',
            'TaskID','Task_Description','TotalCost',
            'VAT','TotalCostWithVAT']; */

 displayedColumns: string[] = 
            ['select','LineNo','SupplierNumber','SupplierName','Site',
              'Task_Description','TotalCost',
              'VAT','TotalCostWithVAT'];
 

  pageSize=100;

  data: CML[] = [];

  selection = new SelectionModel<CML>(true, this.data);

  post_cml_line:Post_Cml_Line | undefined;

  post_cml_lines:Post_Cml_Line[] = [];

  post_cml_request:Post_Cml_Request | undefined;

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

    this.cmlPostingForm = this.fb.group({
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
            return this.dataService!.getPODetailsFromFleet4CMLsXport(
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

    if (this.cmlPostingForm.valid) {

      this.cmlPostingForm.disable();

      const selectedRows = this.selection.selected;

      this.post_cml_lines=[];

      let rowids = '';    

      let mergedLineString='';
      
      let mergedLineDescs ='';

      if (selectedRows!=null){         
        

        mergedLineString= selectedRows[0]?.Job_Rowid.toString();
        

        selectedRows.forEach(r=>{

        rowids = rowids ? rowids + "," + r.Cml_row_id.toString() : r.Cml_row_id.toString();

       // mergedLineDescs = mergedLineDescs ? mergedLineDescs + "," + r.TaskID + '-' + r.Task_Description : r.TaskID + '-' + r.Task_Description;

        this.post_cml_lines.push(new Post_Cml_Line(
          
            r.SupplierNumber,
            r.SupplierName,
            r.LineNo,
            r.VAT,
            r.Site,
            r.TotalCost,
            r.Cml_row_id 
         
          ));


        });

        /*

        const items = mergedLineDescs.split(',');

        interface GroupedItems {
          [prefix: string]: string[];  
        }
        
        const groupedItems: GroupedItems = items.reduce((acc: GroupedItems, item: string) => {

        
          const [prefix, suffix] = item.split(/-(.+)/);

          if (!acc[prefix]) {
            acc[prefix] = [];
          }
        
          acc[prefix].push(suffix.trim());
          return acc;
        }, {});
        
        
        mergedLineString = Object.entries(groupedItems)
          .map(([prefix, items]) => `${prefix}- ${items.join(', ')}`)
          .join('\n');


      */


      }

    
      const { postingDate,invoiceNo,remarks } = this.cmlPostingForm.value;

      this.post_cml_request = new Post_Cml_Request(
        this.LpoRef,
        postingDate,
        invoiceNo,
        this.totalInvoiceValue,
        this.totalVATValue,
        this.totalInvoiceValueWithVAT,
        remarks,
        this.authService.loggedInUserID(),
        rowids,
        mergedLineString.substring(0,49),           
        this.post_cml_lines
      );

      this.subPostLPO = this.dataService.postCMLs2GRP(this.post_cml_request).subscribe((resp)=>{

       
        this.spinner.hide();
       
        this.dataService.appMessageDialogContent.set(`The commercials for LPO# ${this.LpoRef} has been exported to GRP Successfully, export refererence is # ${resp.ReferenceNo.toString()} `);
     

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

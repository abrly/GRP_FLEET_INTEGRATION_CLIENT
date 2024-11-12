import { Component, inject} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { DataService } from '../../../core/services/data.service';


import { DatePipe } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import dropdown from '../../../shared/models/dropdown.model';

@Component({
  selector: 'app-searchlog',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,MatButtonModule,ReactiveFormsModule,MatNativeDateModule,MatDatepickerModule,MatSelectModule],
  templateUrl: './searchlog.component.html',
  styleUrl: './searchlog.component.css',
  providers: [DatePipe] 
})
export class SearchlogComponent {

  
  private dataService = inject(DataService);

 
  getLogForm: FormGroup;


  operationTypes: string[] = ["GRP Postings", "GRP Posting Resets"];

 
  postingTypes: dropdown[] = [
    { name: 'ALL', value: 'ALL' },
    { name: 'Receipts', value: '1' },
    { name: 'Commercials', value: '2' },
    { name: 'Receipt Returns', value: '3' }
  ];


  constructor(private fb: FormBuilder,private datePipe: DatePipe) {
    this.getLogForm = this.fb.group({
      fromdate: ['', Validators.required],
      todate: ['', Validators.required] ,
      logcategory: ['', Validators.required],
      postingType:['', Validators.required],
      lpoRef:[''],
    });
  }

  formatDate(date: Date): string | null {
    return this.datePipe.transform(date, 'MM/dd/yyyy');
  }

  setSelectionDone(){    
    this.dataService.fetchLogSelectionDone.set(false);
  }

  onSubmit() {

    
      if (this.getLogForm.valid) {    
    
         const { fromdate,todate,logcategory,postingType,lpoRef } = this.getLogForm.value;

         console.log(this.getLogForm.value);

        
        this.dataService.fetchLogFromDt.set(this.formatDate(fromdate));
        this.dataService.fetchLogToDt.set(this.formatDate(todate));
        this.dataService.fetchLogCategory.set(logcategory);
        this.dataService.fetchLogPostingTypeId.set(postingType);
        this.dataService.fetchLogLpoRefNo.set(lpoRef);
        this.dataService.fetchLogSelectionDone.set(true);


      
      }

  }

}

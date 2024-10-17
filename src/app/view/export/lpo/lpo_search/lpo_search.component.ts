import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DataService } from '../../../../core/services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lpo-search',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,MatButtonModule,ReactiveFormsModule,MatDatepickerModule],
  templateUrl: './lpo_search.component.html',
  styleUrl: './lpo_search.component.css'
})
export class LpoSearchComponent {


  private getLPOSub!: Subscription;
  
  private dataService = inject(DataService);

  private destroyRef= inject(DestroyRef);


  getLpoForm: FormGroup;


  constructor(private fb: FormBuilder) {
    this.getLpoForm = this.fb.group({
      lpono: ['', Validators.required]   
    });
  }

  onSubmit() {

      if (this.getLpoForm.valid) {
    
    
      const { lpono } = this.getLpoForm.value;

      this.dataService.fetchLpoRef.set(lpono);
      
      }

  }

}

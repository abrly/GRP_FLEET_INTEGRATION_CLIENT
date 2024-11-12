import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { DataService } from '../../../core/services/data.service';
import { Subscription } from 'rxjs';
import { MessageboxComponent } from '../messagebox/messagebox.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lpo-search',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,MatButtonModule,ReactiveFormsModule,MatDatepickerModule],
  templateUrl: './lpo_search.component.html',
  styleUrl: './lpo_search.component.css'
})
export class LpoSearchComponent  {

  readonly dialog = inject(MatDialog); 
  
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
      
      this.getLPOSub = this.dataService.GetPostingDataTotalRecs(lpono,this.dataService.postingTypeId(),this.dataService.isReset()).subscribe((data)=>{

          console.log('did the ss what hell');
          console.log(data);

          if (data.totalItems>0){

              this.dataService.fetchLpoRef.set(lpono);

          }else{


            this.dataService.appMessageDialogContent.set(`No records found!`);
     

            this.dialog.open(MessageboxComponent, {
              "width":"400px",
              "enterAnimationDuration":"300ms",
              "exitAnimationDuration":"300ms",
            });

            

          }

      });

       
      this.destroyRef.onDestroy(() => {
        this.getLPOSub.unsubscribe();
      });


      
      }


  }

}

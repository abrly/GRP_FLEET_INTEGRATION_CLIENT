import {ChangeDetectionStrategy, Component, effect, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import { DataService } from '../../../core/services/data.service';


@Component({
  selector: 'app-messagebox',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule,MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './messagebox.component.html',
  styleUrl: './messagebox.component.css'
})
export class MessageboxComponent {


  private dataService = inject(DataService);

  
  appMessageDialogContent:string = this.dataService.appMessageDialogContent();


  constructor(){

    effect(() => {

     
      this.appMessageDialogContent = this.dataService.appMessageDialogContent(); 

    
    }); 

  }

  onClose(){
   
    this.dataService.appMessageDialogClosed.set(true);

  }

}

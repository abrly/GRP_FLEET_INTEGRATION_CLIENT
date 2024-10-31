import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { DataService } from '../../../core/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageboxComponent } from '../../../shared/components/messagebox/messagebox.component';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, FormsModule,MatFormFieldModule,MatInputModule,MatIcon,MatButtonModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})

export class SignInComponent implements OnInit {

  readonly dialog = inject(MatDialog);  

  signinForm: FormGroup = {} as FormGroup;

  errorMessage: string = '';

  private dataService = inject(DataService);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {

    this.buildBasicForm();
    localStorage.clear();

  }

  buildBasicForm() {
    this.signinForm = this.fb.group({
      username: ['dgwadmin', [Validators.required]],
      password: ['test99', [Validators.required, Validators.minLength(4)]],
    });
  }

  signin() {

    this.errorMessage = '';

    if (this.signinForm.valid) {


      this.auth.logIn(this.signinForm.value).subscribe({
        next: (res: any) => {

          console.log('what ha');

          console.log(res);

          if (res?.data?.authToken ==null){



            this.dataService.appMessageDialogContent.set("Oops! We couldn't log you in. Please double-check your username and password and try again.");
     

            this.dialog.open(MessageboxComponent, {
              "width":"400px",
              "enterAnimationDuration":"300ms",
              "exitAnimationDuration":"300ms",
            });
    
    
            console.log('what ha s');

          }

          this.router.navigateByUrl('/export/receipt');
          
        },
        error: (err: string) => {

          console.log('did you hitm 2');


          this.errorMessage = err;
        },
      });


    }

  }
}

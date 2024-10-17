import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, FormsModule,MatFormFieldModule,MatInputModule,MatIcon,MatButtonModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})

export class SignInComponent implements OnInit {

  signinForm: FormGroup = {} as FormGroup;
  errorMessage: string = '';

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
      email: ['test@example.com', [Validators.required, Validators.email]],
      password: ['1234', [Validators.required, Validators.minLength(4)]],
    });
  }

  signin() {
    this.errorMessage = '';
    this.auth.signin(this.signinForm.value).subscribe({
      next: (res: any) => {
        this.router.navigateByUrl('/export/lpo');
      },
      error: (err: string) => {
        this.errorMessage = err;
      },
    });
  }
}

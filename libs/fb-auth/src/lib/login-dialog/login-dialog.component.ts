import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';

import { AuthState, OAuthLogin, Login } from '../state';

@Component({
  selector: 'mono-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  form: FormGroup;
  loginWith = 'email';

  constructor(
    private store: Store<AuthState>,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public providers: string[]
  ) {}

  ngOnInit() {
    this.form = new FormGroup({});
    this.withEmail();
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }

  withEmail(): void {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  withPhone(): void {
    this.form = this.fb.group({
      phone: new FormControl('', Validators.required)
    });
    this.loginWith = 'phone';
  }

  login($event: Event): void {
    $event.preventDefault();
    if (this.form.valid && this.loginWith === 'email') {
      const email = this.email.value as string;
      const password = this.password.value as string;
      this.store.dispatch(
        new Login({ provider: this.loginWith, email, password })
      );
    }
  }

  selectProvider(provider: string): void {
    this.store.dispatch(new OAuthLogin(provider));
  }
}

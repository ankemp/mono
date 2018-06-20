import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'mono-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  form: FormGroup;
  loginWith = 'email';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public providers: string[],
    private snackBar: MatSnackBar,
    private authApi: AuthService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }

  withPhone(): void {
    this.form = this.fb.group({
      phone: new FormControl('', Validators.required)
    });
    this.loginWith = 'phone';
  }

  private showToast(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  login($event: Event): void {
    $event.preventDefault();
    if (this.form.valid && this.loginWith === 'email') {
      const email = this.email.value as string;
      const password = this.password.value as string;
      this.authApi.login('email', { email, password }).then(_ => {
        this.dialogRef.close();
      }).catch(error => {
        this.showToast(error.message);
      })
    }
  }

  selectProvider(provider: string): void {
    this.authApi.oAuthLogin(provider).then(_ => {
      this.dialogRef.close();
    }).catch(error => {
      this.showToast(error.message);
    });
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { AuthService } from '../services/auth.service';
import { AuthValidators } from '../validators';

@Component({
  selector: 'mono-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {
  form: FormGroup;
  registerWith: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public providers: string[],
    private snackBar: MatSnackBar,
    private authApi: AuthService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({});
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }

  private withEmail(): void {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email], AuthValidators.email(this.authApi)),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
    this.registerWith = 'email';
  }

  private withPhone(): void {
    this.form = this.fb.group({
      phone: new FormControl('', Validators.required)
    });
    this.registerWith = 'phone';
  }

  selectProvider(provider: string): void {
    switch (provider) {
      case 'email':
        this.withEmail();
        break;

      case 'phone':
        this.withPhone();
        break;
    }
  }

  save($event: Event): void {
    $event.preventDefault();
    if (this.form.valid && this.registerWith === 'email') {
      const email = this.email.value as string;
      const password = this.password.value as string;
      this.authApi.register('email', { email, password }).then(_ => {
        this.dialogRef.close();
      }).catch(error => {
        this.snackBar.open(error.message, '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      })
    }
  }

}

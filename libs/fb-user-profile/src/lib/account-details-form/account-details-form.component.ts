import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Store } from '@ngrx/store';

import { AuthState, IUser, AuthService, AuthValidators } from '@mono/fb-auth';

@Component({
  selector: 'mono-account-details-form',
  templateUrl: './account-details-form.component.html',
  styleUrls: ['./account-details-form.component.css']
})
export class AccountDetailsFormComponent implements OnInit {
  @Input() accountDetails: IUser;
  form: FormGroup;

  constructor(
    private store: Store<AuthState>,
    private fb: FormBuilder,
    private authApi: AuthService
  ) {
    this.form = new FormGroup({});
  }

  ngOnInit() {
    const form = {
      email: new FormControl(
        this.accountDetails.email,
        [Validators.required, Validators.email],
        AuthValidators.email(this.authApi)
      ),
      displayName: new FormControl(this.accountDetails.displayName, [
        Validators.required
      ])
    };
    // Add/Show password fields if account has password - Need to check providers for this
    this.form = this.fb.group(form);
  }

  submit(event: Event): void {
    event.preventDefault();
    console.log('account-details-form submit()');
    // this.store.dispatch(new UpdateAccount(profile));
  }
}

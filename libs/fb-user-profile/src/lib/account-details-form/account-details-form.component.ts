import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from '@mono/fb-auth';

@Component({
  selector: 'mono-account-details-form',
  templateUrl: './account-details-form.component.html',
  styleUrls: ['./account-details-form.component.css']
})
export class AccountDetailsFormComponent implements OnInit {
  @Input() accountDetails: any;
  form: FormGroup;

  constructor(private store: Store<AuthState>, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({});
  }

  submit(event: Event): void {
    event.preventDefault();
    console.log('account-details-form submit()');
    // this.store.dispatch(new );
  }
}

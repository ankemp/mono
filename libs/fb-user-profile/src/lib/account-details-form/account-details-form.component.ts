import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AngularFireStorage } from 'angularfire2/storage';

import { Observable, from } from 'rxjs';
import { map, tap, switchMap, mergeMap } from 'rxjs/operators';

import {
  AuthState,
  IUser,
  // AuthService,
  // AuthValidators,
  UpdateAccount
} from '@mono/fb-auth';

@Component({
  selector: 'mono-account-details-form',
  templateUrl: './account-details-form.component.html',
  styleUrls: ['./account-details-form.component.css']
})
export class AccountDetailsFormComponent implements OnInit {
  @Input()
  accountDetails: IUser;
  form: FormGroup;
  uploadProgress$: Observable<number>;

  constructor(
    private store: Store<AuthState>,
    private fb: FormBuilder,
    // private authApi: AuthService,
    public afUpload: AngularFireStorage
  ) {
    this.form = new FormGroup({});
  }

  ngOnInit() {
    const form = {
      email: new FormControl(
        this.accountDetails.email,
        [Validators.required, Validators.email]
        // AuthValidators.email(this.authApi)
      ),
      displayName: new FormControl(this.accountDetails.displayName, [
        Validators.required
      ]),
      photoURL: new FormControl(this.accountDetails.photoURL, [
        Validators.required
      ]),
      avatarFile: new FormControl(null)
    };
    // Add/Show password fields if account has password - Need to check providers for this
    this.form = this.fb.group(form);
    this.form
      .get('avatarFile')
      .valueChanges.pipe(
        map((files: File[]) => files.pop()),
        switchMap(file => {
          const path = `avatars/${new Date().getTime()}_${file.name}`;
          const task = this.afUpload.upload(path, file);
          this.uploadProgress$ = task.percentageChanges();
          return from(task);
        }),
        mergeMap(task => task.ref.getDownloadURL())
      )
      .subscribe(url => {
        this.form.get('photoURL').setValue(url);
      });
  }

  submit(event: Event): void {
    event.preventDefault();
    const profile = {
      ...this.form.value
    };
    delete profile.avatarFile;
    this.store.dispatch(new UpdateAccount(profile));
  }
}

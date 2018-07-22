import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import { skipWhile } from 'rxjs/operators';

import { getCurrentProfile } from '../state';

@Component({
  selector: 'mono-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent {
  profile$: Observable<any>;

  constructor(private store: Store<any>) {
    this.profile$ = this.store.pipe(
      select(getCurrentProfile),
      skipWhile(u => !u.uid)
    );
  }
}

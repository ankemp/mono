import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
      map(user => {
        if (!user || !user.public) {
          return false;
        }
        return user;
      })
    );
  }
}

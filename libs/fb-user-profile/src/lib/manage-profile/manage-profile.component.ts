import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import { tap, skipWhile, take } from 'rxjs/operators';

import { User, getCurrentUser, getIsAuthLoading } from '@mono/fb-auth';
import { UpdateProfile } from '../state/profile.actions';
import { Banner, AddBanner, RemoveBanner } from '@mono/ui-state';

@Component({
  selector: 'mono-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.css']
})
export class ManageProfileComponent implements OnInit, OnDestroy {
  authProfile$: Observable<User>;
  loading$: Observable<boolean>;

  constructor(private store: Store<any>) {
    this.authProfile$ = store.pipe(
      select(getCurrentUser),
      skipWhile(u => !u.uid),
      take(1),
      tap(user => {
        if (!user.profile.public) {
          const banner: Banner = {
            id: `_make-public`,
            index: 0,
            desc: "Looks like your profile isn't public.",
            buttonText: 'Make Public',
            action: () => this.makePublic(user.profile.uid),
            color: 'accent'
          };
          this.store.dispatch(new AddBanner(banner));
        }
      })
    );
    this.loading$ = store.pipe(select(getIsAuthLoading));
  }

  ngOnInit() {
    // Build forms
  }

  ngOnDestroy() {
    this.store.dispatch(new RemoveBanner('_make-public'));
  }

  makePublic(uid: string): void {
    this.store.dispatch(new UpdateProfile({ uid, public: true }));
  }
}

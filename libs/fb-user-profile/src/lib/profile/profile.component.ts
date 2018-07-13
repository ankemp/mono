import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { Observable, combineLatest } from 'rxjs';
import { skipUntil, map, share } from 'rxjs/operators';
import { AuthState, getCurrentUser, getIsAuthLoading } from '@mono/fb-auth';

@Component({
  selector: 'mono-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  authProfile$: Observable<any>;
  isAuthUser$: Observable<boolean>;
  loading$: Observable<boolean>;

  constructor(private route: ActivatedRoute, private store: Store<AuthState>) {
    this.authProfile$ = store.pipe(select(getCurrentUser));
    this.loading$ = store.pipe(select(getIsAuthLoading));
  }

  ngOnInit() {
    this.isAuthUser$ = combineLatest(this.route.params, this.authProfile$).pipe(
      map(
        ([params, authState]) =>
          authState !== null && params['uid'] === authState.uid
      ),
      share()
    );
  }
}

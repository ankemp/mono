import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, combineLatest, of } from 'rxjs';
import { switchMap, map, skipWhile } from 'rxjs/operators';
import { AuthService } from '@mono/fb-auth';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'mono-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile$: Observable<any>;
  isAuthUser$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private authApi: AuthService,
    private profileApi: ProfileService
  ) { }

  ngOnInit() {
    this.isAuthUser$ = combineLatest(this.route.params, this.authApi.authState).pipe(
      map(([params, authState]) => (authState !== null && params['uid'] === authState.uid))
    );
    this.userProfile$ = combineLatest(this.route.params, this.authApi.authState, this.isAuthUser$).pipe(
      skipWhile(([, authState]) => !authState),
      switchMap(([params, authState, isAuthUser]) => {
        const publicProfile = this.profileApi.lookupProfile(params['uid']);
        if (isAuthUser) {
          return combineLatest(of(authState), publicProfile);
        }
        return publicProfile;
      })
    );
  }

}

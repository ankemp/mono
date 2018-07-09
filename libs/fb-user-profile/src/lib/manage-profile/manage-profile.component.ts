import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, empty } from 'rxjs';
import { map, withLatestFrom, switchMap } from 'rxjs/operators';
import { User } from '@firebase/auth-types';
import { Banner, NBState, AddBanner, RemoveBanner } from '@mono/ui-state';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'mono-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.css']
})
export class ManageProfileComponent implements OnInit, OnDestroy {
  @Input() private userProfile: Observable<any[]>;
  authProfile$: Observable<User>;
  publicProfile$: Observable<any>;

  constructor(
    private store: Store<NBState>,
    private profileApi: ProfileService
  ) {}

  ngOnInit() {
    this.authProfile$ = this.userProfile.pipe(
      map(([authProfile]) => authProfile)
    );
    this.publicProfile$ = this.userProfile.pipe(
      map(([, publicProfile]) => publicProfile)
      // tap(profile => {
      //   const banner: Banner = {
      //     id: `_make-public`,
      //     index: 0,
      //     desc: 'Looks like your profile isn\'t public.',
      //     buttonText: 'Make Public',
      //     action: this.makePublic,
      //     color: 'accent'
      //   };
      //   this.store.dispatch(new AddBanner(banner));
      // })
    );
    // TODO: Remove this, and uncomment tap() when dom is built
    this.publicProfile$.subscribe(profile => {
      const banner: Banner = {
        id: `_make-public`,
        index: 0,
        desc: "Looks like your profile isn't public.",
        buttonText: 'Make Public',
        action: this.makePublic,
        color: 'accent'
      };
      this.store.dispatch(new AddBanner(banner));
    });
  }

  ngOnDestroy() {
    this.store.dispatch(new RemoveBanner('_make-public'));
  }

  makePublic(): void {
    console.log('makePublic()');
    // const publicProfile = {
    //   uid: profile.uid,
    //   avatar: profile.photoURL,
    //   email: profile.email,
    //   displayName: profile.displayName
    // }
    // return this.profileApi.updateProfile(profile.uid, publicProfile);
  }
}

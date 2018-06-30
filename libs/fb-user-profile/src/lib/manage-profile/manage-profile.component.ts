import { Component, OnInit, Input } from '@angular/core';

import { Observable, empty, } from 'rxjs';
import { map, withLatestFrom, switchMap } from 'rxjs/operators';
import { User } from '@firebase/auth-types';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'mono-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.css']
})
export class ManageProfileComponent implements OnInit {
  @Input() private userProfile: Observable<any[]>;
  authProfile$: Observable<User>;
  publicProfile$: Observable<any>;
  isPublic$: Observable<boolean>;

  constructor(
    private profileApi: ProfileService
  ) { }

  ngOnInit() {
    this.authProfile$ = this.userProfile.pipe(
      map(([authProfile,]) => authProfile)
    );
    this.publicProfile$ = this.userProfile.pipe(
      map(([, publicProfile]) => publicProfile)
    );
    this.isPublic$ = this.publicProfile$.pipe(
      map(([, publicProfile]) => !!publicProfile)
    )
  }

  makePublic(): void {
    empty().pipe(
      withLatestFrom(this.authProfile$),
      switchMap(([, profile]) => {
        const publicProfile = {
          uid: profile.uid,
          avatar: profile.photoURL,
          email: profile.email,
          displayName: profile.displayName
        }
        return this.profileApi.updateProfile(profile.uid, publicProfile);
      })
    )
  }

}

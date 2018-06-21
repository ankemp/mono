import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@firebase/auth-types';

@Component({
  selector: 'mono-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.css']
})
export class ManageProfileComponent implements OnInit {
  @Input() private userProfile: Observable<any>;
  authProfile$: Observable<User>;
  publicProfile$: Observable<any>;

  constructor() { }

  ngOnInit() {
    this.authProfile$ = this.userProfile.pipe(
      map(([authProfile,]) => authProfile)
    );
    this.publicProfile$ = this.userProfile.pipe(
      map(([, publicProfile]) => publicProfile)
    );
  }

}

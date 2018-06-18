import { Injectable, Inject } from '@angular/core';

import { firebase } from '@firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, AuthProvider } from '@firebase/auth-types';
import { AuthOptionsToken, AuthOptions } from '../config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUid: string;
  public authState: Observable<User>;
  public loggedIn: Observable<boolean>;

  constructor(
    private afAuth: AngularFireAuth,
    @Inject(AuthOptionsToken) private authOptions: AuthOptions
  ) {
    this.authState = afAuth.authState.pipe(
      map((state: User) => {
        this.authUid = state.uid;
        return state;
      })
    );
    this.loggedIn = afAuth.authState.pipe(
      map((state: User) => (!!state && !!state.uid))
    );
  }

  private useProvider(provider: string): AuthProvider {
    const providers = {
      'google': new firebase.auth.GoogleAuthProvider()
    };
    return providers[provider];
  }

  login(provider: string): void {
    if (this.authOptions.providers.includes(provider)) {
      this.afAuth.auth.signInWithPopup(this.useProvider(provider));
    } else {
      // show provider not included error
    }
  }

  logout(): void {
    this.afAuth.auth.signOut();
  }
}

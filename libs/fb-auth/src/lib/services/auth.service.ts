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
  public providers: Array<string>;

  constructor(
    private afAuth: AngularFireAuth,
    @Inject(AuthOptionsToken) authOptions: AuthOptions
  ) {
    this.providers = authOptions.providers;
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

  private get oAuthProviders(): any {
    return {
      'google': new firebase.auth.GoogleAuthProvider(),
      'facebook': new firebase.auth.FacebookAuthProvider(),
      'twitter': new firebase.auth.TwitterAuthProvider(),
      'github': new firebase.auth.GithubAuthProvider()
    };
  }

  private useOAuthProvider(provider: string): AuthProvider {
    return this.oAuthProviders[provider];
  }

  private checkProvider(provider: string): boolean {
    return this.providers.includes(provider);
  }

  login(provider: string): Promise<any> {
    if (this.checkProvider(provider) && !!this.oAuthProviders[provider]) {
      return this.afAuth.auth.signInWithPopup(this.useOAuthProvider(provider));
    }
    return Promise.reject({ code: 'auth/provider-not-allowed', message: 'The provider you are trying to authorize through is not allowed for this application.' });
  }

  register(provider: string): Promise<any> {
    if (this.checkProvider(provider)) {
      // this.afAuth.auth.
    }
    return Promise.reject({ code: 'auth/provider-not-allowed', message: 'The provider you are trying to authorize through is not allowed for this application.' });
  }

  logout(): Promise<any> {
    return this.afAuth.auth.signOut();
  }
}

import { Injectable, Inject } from '@angular/core';

import { firebase } from '@firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User, AuthProvider } from '@firebase/auth-types';
import { AuthOptionsToken, AuthOptions } from '../config';

const PROVIDER_NOT_ALLOWED = { code: 'auth/provider-not-allowed', message: 'The provider you are trying to authorize through is not allowed for this application.' };

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
      startWith(null),
      map((state: User) => {
        this.authUid = state ? state.uid : null;
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

  private get providerNotAllowed(): Promise<any> {
    return Promise.reject(PROVIDER_NOT_ALLOWED);
  }

  login(provider: string, { email, password }: { email: string, password: string }): Promise<any> {
    if (this.checkProvider(provider)) {
      return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }
    return this.providerNotAllowed;
  }

  oAuthLogin(provider: string): Promise<any> {
    if (this.checkProvider(provider) && !!this.oAuthProviders[provider]) {
      return this.afAuth.auth.signInWithPopup(this.useOAuthProvider(provider));
    }
    return this.providerNotAllowed;
  }

  checkEmail(email: string) {
    return this.afAuth.auth.fetchSignInMethodsForEmail(email);
  }

  register(provider: string, { email, password }: { email: string, password: string }): Promise<any> {
    if (this.checkProvider(provider)) {
      return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    }
    return this.providerNotAllowed;
  }

  logout(): Promise<any> {
    return this.afAuth.auth.signOut();
  }
}

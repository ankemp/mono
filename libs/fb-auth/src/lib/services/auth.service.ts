import { Injectable, Inject } from '@angular/core';
import { firebase } from '@firebase/app';
import { User, AuthProvider } from '@firebase/auth-types';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable, throwError, from } from 'rxjs';

import { AuthOptionsToken, AuthOptions } from '../config';
import { AuthError } from '../state';

const PROVIDER_NOT_ALLOWED = {
  code: 'auth/provider-not-allowed',
  message:
    'The provider you are trying to authorize through is not allowed for this application.'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _manualProviders = ['email', 'phone'];
  public authState: Observable<User>;
  public auth: firebase.auth.Auth;
  public providers: Array<string>;

  constructor(
    private afAuth: AngularFireAuth,
    @Inject(AuthOptionsToken) authOptions: AuthOptions
  ) {
    this.authState = afAuth.authState;
    this.auth = afAuth.auth;
    this.providers = authOptions.providers;
  }

  private get oAuthProvidersInstance(): any {
    return {
      google: new firebase.auth.GoogleAuthProvider(),
      facebook: new firebase.auth.FacebookAuthProvider(),
      twitter: new firebase.auth.TwitterAuthProvider(),
      github: new firebase.auth.GithubAuthProvider()
    };
  }

  get manualProviders(): string[] {
    return this.providers.filter(p => this._manualProviders.includes(p));
  }

  get oAuthProviders(): string[] {
    return this.providers.filter(p => !this._manualProviders.includes(p));
  }

  useOAuthProvider(provider: string): AuthProvider {
    return this.oAuthProvidersInstance[provider];
  }

  checkProvider(provider: string): boolean {
    return this.providers.includes(provider);
  }

  get providerNotAllowed(): Observable<any> {
    return throwError(new AuthError(PROVIDER_NOT_ALLOWED));
  }

  login(
    provider: string,
    { email, password }: { email: string; password: string }
  ): Observable<firebase.auth.UserCredential> {
    if (this.checkProvider(provider)) {
      return from(this.afAuth.auth.signInWithEmailAndPassword(email, password));
    }
    return this.providerNotAllowed;
  }

  oAuthLogin(provider: string): Observable<firebase.auth.UserCredential> {
    if (
      this.checkProvider(provider) &&
      !!this.oAuthProvidersInstance[provider]
    ) {
      return from(
        this.afAuth.auth.signInWithPopup(this.useOAuthProvider(provider))
      );
    }
    return this.providerNotAllowed;
  }

  checkEmail(email: string): Observable<string[]> {
    return from(this.afAuth.auth.fetchSignInMethodsForEmail(email));
  }

  register(
    provider: string,
    { email, password }: { email: string; password: string }
  ): Observable<firebase.auth.UserCredential> {
    if (this.checkProvider(provider)) {
      return from(
        this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      );
    }
    return this.providerNotAllowed;
  }

  logout(): Observable<void> {
    return from(this.afAuth.auth.signOut());
  }
}

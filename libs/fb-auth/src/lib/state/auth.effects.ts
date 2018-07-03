import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { AuthActionTypes, GetUser, Authenticated, NotAuthenticated, AuthError, OAuthLogin, Login } from './auth.actions';
import { User } from '../../models';

@Injectable()
export class AuthEffects {
  public providers: Array<string>;

  constructor(
    private actions$: Actions,
    private authApi: AuthService
  ) { }

  @Effect()
  getUser$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.GetUser),
    switchMap(_ => this.authApi.authState),
    map(authState => {
      if (authState) {
        const user = new User(authState.displayName, authState.email, authState.uid);
        return new Authenticated(user);
      }
      return new NotAuthenticated();
    }),
    catchError(err => of(new AuthError(err)))
  );

  @Effect()
  oAuthLogin$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.OAuthLogin),
    map((action: OAuthLogin) => action.payload),
    switchMap(provider => this.authApi.oAuthLogin(provider)),
    map(_ => new GetUser()),
    catchError(err => of(new AuthError(err)))
  );

  login$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    map((action: Login) => action.payload),
    switchMap(payload => this.authApi.login(payload.provider, { ...payload })),
    map(_ => new GetUser()),
    catchError(err => of(new AuthError(err)))
  );

  @Effect()
  logout$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.Logout),
    switchMap(_ => this.authApi.logout()),
    map(_ => new NotAuthenticated()),
    catchError(err => of(new AuthError(err)))
  );
}

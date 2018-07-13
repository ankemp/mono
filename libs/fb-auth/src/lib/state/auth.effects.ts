import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { Observable, of, throwError, combineLatest } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { AuthService, ProfileService } from '../services';
import {
  AuthActionTypes,
  GetUser,
  Authenticated,
  NotAuthenticated,
  AuthError,
  OAuthLogin,
  Login
} from './auth.actions';
import { AddSnackBar } from '@mono/ui-state';
import { User } from '../../models';

@Injectable()
export class AuthEffects {
  public providers: Array<string>;

  constructor(
    private actions$: Actions,
    private authApi: AuthService,
    private profileApi: ProfileService
  ) {}

  @Effect()
  getUser$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.GetUser),
    switchMap(_ => this.authApi.authState),
    switchMap(authState => {
      if (authState) {
        return combineLatest(
          of(authState),
          this.profileApi.lookupProfile(authState.uid)
        );
      }
      return throwError({
        code: 'no-user-authenticated',
        message: 'No User Authenticated'
      });
    }),
    map(([authState, profile]: Array<any>) => {
      if (authState) {
        const user = new User(
          authState.displayName,
          authState.uid,
          authState.email,
          profile
        );
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

  @Effect({ dispatch: false })
  authenticated$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.Authenticated),
    map((action: Authenticated) => action.payload),
    map(
      user =>
        new AddSnackBar({
          message: `Welcome back, ${user.displayName}`,
          priority: 0
        })
    )
  );

  @Effect()
  error$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.AuthError),
    map((action: AuthError) => action.payload),
    map(({ message }) => new AddSnackBar({ message }))
  );
}

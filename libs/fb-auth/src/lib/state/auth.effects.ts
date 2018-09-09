import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { Observable, of, throwError, combineLatest, from } from 'rxjs';
import {
  map,
  switchMap,
  catchError,
  take,
  mergeMap,
  withLatestFrom,
  concatMap
} from 'rxjs/operators';

import { AuthService, ProfileService } from '../services';
import {
  AuthActionTypes,
  GetUser,
  Authenticated,
  NotAuthenticated,
  AuthError,
  OAuthLogin,
  Login,
  UpdateAccount,
  UpdateAccountSuccess
} from './auth.actions';
import { AddSnackBar } from '@mono/ui-state';
import { User, IUser } from '../../models';

@Injectable()
export class AuthEffects {
  public providers: string[];

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
          this.profileApi.lookupProfile(authState.uid).pipe(take(1))
        );
      }
      return throwError({
        code: 'auth/no-user-authenticated',
        message: 'No User Authenticated'
      });
    }),
    map(([authState, profile]) => {
      let user: User;
      if (authState) {
        user = new User(
          authState.displayName,
          authState.uid,
          authState.email,
          profile
        );
      }
      return user;
    }),
    map(user => (!!user ? new Authenticated(user) : new NotAuthenticated())),
    catchError(err => of(new AuthError(err)))
  );

  @Effect()
  oAuthLogin$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.OAuthLogin),
    map((action: OAuthLogin) => action.payload),
    switchMap(provider => this.authApi.oAuthLogin(provider)),
    switchMap(_ => of(new GetUser())),
    catchError(err => of(new AuthError(err)))
  );

  login$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    map((action: Login) => action.payload),
    switchMap(payload => this.authApi.login(payload.provider, { ...payload })),
    switchMap(_ => of(new GetUser())),
    catchError(err => of(new AuthError(err)))
  );

  @Effect()
  logout$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.Logout),
    switchMap(_ => this.authApi.logout()),
    switchMap(_ => of(new NotAuthenticated())),
    catchError(err => of(new AuthError(err)))
  );

  @Effect()
  authenticated$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.Authenticated),
    map((action: Authenticated) => action.payload),
    switchMap(user =>
      of(
        new AddSnackBar({
          message: `Welcome back, ${user.displayName}`,
          priority: 0
        })
      )
    )
  );

  @Effect()
  updateAccount$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.UpdateAccount),
    map((action: UpdateAccount) => action.payload),
    withLatestFrom(this.authApi.authState),
    concatMap(([profile, user]) =>
      from(
        user
          .updateProfile({
            displayName: profile.displayName,
            photoURL: profile.photoURL
            // photoURL is refusing to save.
          })
          .then(() => ({ profile, user }))
      )
    ),
    concatMap(({ profile, user }) =>
      from(user.updateEmail(profile.email).then(() => ({ profile, user })))
    ),
    concatMap(({ profile, user }) =>
      this.profileApi.updateProfile(user.uid, profile).pipe(map(() => user))
    ),
    switchMap(user => this.profileApi.lookupProfile(user.uid).pipe(take(1))),
    mergeMap(user => [
      new UpdateAccountSuccess(user as IUser),
      new AddSnackBar({
        message: 'Profile Updated',
        priority: 0
      })
    ])
  );

  @Effect()
  error$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.AuthError),
    map((action: AuthError) => action.payload),
    switchMap(({ message }) => of(new AddSnackBar({ message })))
  );
}

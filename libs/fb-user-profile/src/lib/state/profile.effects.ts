import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import {
  map,
  switchMap,
  catchError,
  mergeMap,
  concatMap
} from 'rxjs/operators';

import { ProfileService } from '@mono/fb-auth';
import {
  ProfileActionTypes,
  GetProfile,
  GetProfileSuccess,
  GetProfileFail,
  UpdateProfile,
  UpdateProfileSuccess
} from './profile.actions';
import { AddSnackBar, ofRoute, RouterChange } from '@mono/ui-state';

@Injectable()
export class ProfileEffects {
  constructor(private actions$: Actions, private profileApi: ProfileService) {}

  @Effect()
  getProfile$: Observable<Action> = this.actions$.pipe(
    ofType(ProfileActionTypes.GetProfile),
    map((action: GetProfile) => action.payload),
    mergeMap(uid => this.profileApi.lookupProfile(uid)),
    switchMap(user => of(new GetProfileSuccess(user))),
    catchError(err => of(new GetProfileFail(err)))
  );

  @Effect()
  getProfileFail$: Observable<Action> = this.actions$.pipe(
    ofType(ProfileActionTypes.GetProfileFail),
    map((action: GetProfileFail) => action.payload),
    switchMap(({ message }) => of(new AddSnackBar(message)))
  );

  @Effect()
  updateProfile$: Observable<Action> = this.actions$.pipe(
    ofType(ProfileActionTypes.UpdateProfile),
    map((action: UpdateProfile) => action.payload),
    concatMap(profile => this.profileApi.updateProfile(profile.uid, profile)),
    concatMap(profile => of(new UpdateProfileSuccess(profile)))
  );

  // Route Effects
  @Effect()
  loadProfile$: Observable<Action> = this.actions$.pipe(
    ofRoute([':uid/edit', ':uid/public']),
    map((action: RouterChange) => action.payload),
    switchMap(route => of(new GetProfile(route.params['uid'])))
  );
}

import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import { ProfileService } from '@mono/fb-auth';
import {
  ProfileActionTypes,
  GetProfile,
  GetProfileSuccess,
  GetProfileFail
} from './profile.actions';
import { AddSnackBar } from '@mono/ui-state';

@Injectable()
export class ProfileEffects {
  constructor(private actions$: Actions, private profileApi: ProfileService) {}

  @Effect()
  getUser$: Observable<Action> = this.actions$.pipe(
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
}
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import {
  NBActionTypes,
  DoBannerAction,
  DoBannerActionSuccess
} from './notification-banner.actions';

@Injectable()
export class NotificationBannerEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  doBannerAction$: Observable<Action> = this.actions$.pipe(
    ofType(NBActionTypes.DoBannerAction),
    map((action: DoBannerAction) => action.payload),
    mergeMap(banner => {
      banner.action();
      return of(new DoBannerActionSuccess(banner.id));
    })
  );
}

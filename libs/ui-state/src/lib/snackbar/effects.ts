import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';

import { Observable, empty, of } from 'rxjs';
import { switchMap, map, withLatestFrom, tap, delay } from 'rxjs/operators';
import {
  SBActionTypes,
  OpenSnackBar,
  CloseSnackbar,
  AddSnackBar,
  CloseSnackbarSuccess,
  AddSnackBarSuccess,
  OpenSnackBarSuccess
} from './actions';
import { UIState, getSBState } from '../state';
import { SnackBar } from '../../models';

@Injectable()
export class SnackBarEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<UIState>,
    private snackbar: MatSnackBar
  ) {}

  @Effect()
  add$: Observable<Action> = this.actions$.pipe(
    ofType(SBActionTypes.Add),
    map((action: AddSnackBar) => action.payload),
    map(sb => new SnackBar(sb.message, sb.action, sb.config, sb.priority)),
    switchMap(sb => of(new AddSnackBarSuccess(sb)))
  );

  @Effect()
  addSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(SBActionTypes.AddSuccess),
    map((action: AddSnackBarSuccess) => action.payload),
    withLatestFrom(this.store$.pipe(select(getSBState))),
    switchMap(([sb, sbState]) => {
      if (!sbState.active) {
        return of(new OpenSnackBar(sb));
      }
      return empty();
    })
  );

  @Effect()
  open$: Observable<Action> = this.actions$.pipe(
    ofType(SBActionTypes.Open),
    map((action: OpenSnackBar) => action.payload),
    switchMap(sb => of(new OpenSnackBarSuccess(sb)))
  );

  @Effect()
  openSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(SBActionTypes.OpenSuccess),
    map((action: OpenSnackBarSuccess) => action.payload),
    tap(sb => {
      this.snackbar.open(sb.message, sb.action, sb.config);
    }),
    delay(2000),
    switchMap(sb => of(new CloseSnackbar(sb.id)))
  );

  @Effect()
  close$: Observable<Action> = this.actions$.pipe(
    ofType(SBActionTypes.Close),
    map((action: CloseSnackbar) => action.payload),
    tap(() => this.snackbar.dismiss()),
    delay(200),
    switchMap(id => of(new CloseSnackbarSuccess(id)))
  );

  @Effect()
  closeSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(SBActionTypes.CloseSuccess),
    withLatestFrom(this.store$.pipe(select(getSBState))),
    switchMap(([, sbState]) => {
      if (sbState.bars.length > 0) {
        return of(new OpenSnackBar(sbState.bars[0]));
      }
      return empty();
    })
  );
}

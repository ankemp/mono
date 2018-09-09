import { Action } from '@ngrx/store';
import { ISnackBar } from '../../models';

export enum SBActionTypes {
  Add = '[SnackBar] Add',
  AddSuccess = '[SnackBar] Add Success',
  Open = '[SnackBar] Open',
  OpenSuccess = '[SnackBar] Open Success',
  Close = '[SnackBar] Close',
  CloseSuccess = '[SnackBar] Close Success'
}

export class AddSnackBar implements Action {
  readonly type = SBActionTypes.Add;

  constructor(public payload: ISnackBar) {}
}

export class AddSnackBarSuccess implements Action {
  readonly type = SBActionTypes.AddSuccess;

  constructor(public payload: ISnackBar) {}
}

export class OpenSnackBar implements Action {
  readonly type = SBActionTypes.Open;

  constructor(public payload: ISnackBar) {}
}

export class OpenSnackBarSuccess implements Action {
  readonly type = SBActionTypes.OpenSuccess;

  constructor(public payload: ISnackBar) {}
}

export class CloseSnackbar implements Action {
  readonly type = SBActionTypes.Close;

  constructor(public payload: string) {}
}

export class CloseSnackbarSuccess implements Action {
  readonly type = SBActionTypes.CloseSuccess;

  constructor(public payload: string) {}
}

export type SBActionsUnion =
  | AddSnackBar
  | AddSnackBarSuccess
  | OpenSnackBar
  | OpenSnackBarSuccess
  | CloseSnackbar
  | CloseSnackbarSuccess;

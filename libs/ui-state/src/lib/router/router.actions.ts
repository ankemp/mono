import { Action } from '@ngrx/store';
import { RouteGoModel, RouteChangeModel } from '../../models';

export enum RouterActionTypes {
  Go = '[Router] Go',
  Back = '[Router] Back',
  Forward = '[Router] Forward',
  Change = '[Router] Change'
}

export class RouterGo implements Action {
  readonly type = RouterActionTypes.Go;

  constructor(public payload: RouteGoModel) {}
}

export class RouterBack implements Action {
  readonly type = RouterActionTypes.Back;
}

export class RouterForward implements Action {
  readonly type = RouterActionTypes.Forward;
}

export class RouterChange implements Action {
  readonly type = RouterActionTypes.Change;
  constructor(public payload: RouteChangeModel) {}
}

export type RouterActionsUnion =
  | RouterGo
  | RouterBack
  | RouterForward
  | RouterChange;

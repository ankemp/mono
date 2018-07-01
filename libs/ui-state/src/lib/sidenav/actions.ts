import { Action } from '@ngrx/store';

export enum SNActionTypes {
  SetSmallScreen = '[SideNav] Set Small Screen',
  SetMenuMode = '[SideNav] Set Menu Mode',
  ToggleSideNav = '[SideNav] Toggle SideNav'
}

export class SetSmallScreen implements Action {
  readonly type = SNActionTypes.SetSmallScreen;

  constructor(public payload: boolean) { }
}

export class SetMenuMode implements Action {
  readonly type = SNActionTypes.SetMenuMode;

  constructor(public payload: 'side' | 'over') { }
}

export class ToggleSideNav implements Action {
  readonly type = SNActionTypes.ToggleSideNav;
}

export type SNActionsUnion = SetSmallScreen | SetMenuMode | ToggleSideNav;

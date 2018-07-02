import { Action } from '@ngrx/store';
import { Banner } from '../../models';

export enum NBActionTypes {
  AddBanner = '[Notification Banner] Add Banner',
  RemoveBanner = '[Notification Banner] Remove Banner',
  SetBanner = '[Notification Banner] Set Banner'
}

export class AddBanner implements Action {
  readonly type = NBActionTypes.AddBanner;

  constructor(public payload: Banner) { }
}

export class RemoveBanner implements Action {
  readonly type = NBActionTypes.RemoveBanner;

  constructor(public payload: string) { }
}

export class SetBanner implements Action {
  readonly type = NBActionTypes.SetBanner;

  constructor(public payload: string) { }
}

export type NBActionsUnion = AddBanner | RemoveBanner | SetBanner;

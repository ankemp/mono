import { Action } from '@ngrx/store';
import { Banner } from '@mono/notification-banner';

export enum NBActionTypes {
  AddBanner = '[Notification Banner] Add Banner',
  RemoveBanner = '[Notification Banner] Remove Banner',
  SetBanner = '[Notification Banner] Set Banner'
}

export class AddBanner implements Action {
  readonly type = NBActionTypes.AddBanner;

  constructor(public banner: Banner) { }
}

export class RemoveBanner implements Action {
  readonly type = NBActionTypes.RemoveBanner;

  constructor(public id: string) { }
}

export class SetBanner implements Action {
  readonly type = NBActionTypes.SetBanner;

  constructor(public id: string) { }
}

export type NBActionsUnion = AddBanner | RemoveBanner | SetBanner;

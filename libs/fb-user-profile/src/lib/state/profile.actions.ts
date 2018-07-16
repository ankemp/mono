import { Action } from '@ngrx/store';
import { IUser } from '@mono/fb-auth';

export enum ProfileActionTypes {
  GetProfile = '[Profile] Get Profile',
  GetProfileSuccess = '[Profile] Get Profile Success',
  GetProfileFail = '[Profile] Get Profile Fail'
}

export class GetProfile implements Action {
  readonly type = ProfileActionTypes.GetProfile;
  constructor(public payload: string) {}
}

export class GetProfileSuccess implements Action {
  readonly type = ProfileActionTypes.GetProfileSuccess;
  constructor(public payload: Partial<IUser>) {}
}

export class GetProfileFail implements Action {
  readonly type = ProfileActionTypes.GetProfileFail;
  constructor(public payload: any) {}
}

export type ProfileActionUnion =
  | GetProfile
  | GetProfileSuccess
  | GetProfileFail;

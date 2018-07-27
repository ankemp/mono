import { Action } from '@ngrx/store';
import { IUser } from '@mono/fb-auth';

export enum ProfileActionTypes {
  GetProfile = '[Profile] Get Profile',
  GetProfileSuccess = '[Profile] Get Profile Success',
  GetProfileFail = '[Profile] Get Profile Fail',
  UpdateProfile = '[Profile] Update Profile',
  UpdateProfileSuccess = '[Profile] Update Profile Success',
  UpdateProfileFail = '[Profile] Update Profile Fail'
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
export class UpdateProfile implements Action {
  readonly type = ProfileActionTypes.UpdateProfile;
  constructor(public payload: Partial<IUser>) {}
}
export class UpdateProfileSuccess implements Action {
  readonly type = ProfileActionTypes.UpdateProfileSuccess;
  constructor(public payload: IUser) {}
}
export class UpdateProfileFail implements Action {
  readonly type = ProfileActionTypes.UpdateProfileFail;
  constructor(public payload: any) {}
}

export type ProfileActionUnion =
  | GetProfile
  | GetProfileSuccess
  | GetProfileFail
  | UpdateProfile
  | UpdateProfileSuccess
  | UpdateProfileFail;

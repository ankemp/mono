import { Action } from '@ngrx/store';
import { User } from '../../models';

export enum AuthActionTypes {
  GetUser = '[Auth] Get User',
  UpdateProfile = '[Auth] Update Profile',
  UpdateProfileSuccess = '[Auth] Update Profile Success',
  Authenticated = '[Auth] Authenticated',
  NotAuthenticated = '[Auth] Not Authenticated',
  OAuthLogin = '[Auth] oAuth Login Attempt',
  Login = '[Auth] Login Attempt',
  Logout = '[Auth] Logout',
  AuthError = '[Auth] Error'
}

export class GetUser implements Action {
  readonly type = AuthActionTypes.GetUser;
}

export class UpdateProfile implements Action {
  readonly type = AuthActionTypes.UpdateProfile;

  constructor(public payload: Partial<User>) {}
}

export class UpdateProfileSuccess implements Action {
  readonly type = AuthActionTypes.UpdateProfileSuccess;

  constructor(public payload: Partial<User>) {}
}

export class Authenticated implements Action {
  readonly type = AuthActionTypes.Authenticated;

  constructor(public payload: User) {}
}

export class NotAuthenticated implements Action {
  readonly type = AuthActionTypes.NotAuthenticated;
}

export class OAuthLogin implements Action {
  readonly type = AuthActionTypes.OAuthLogin;

  constructor(public payload: string) {}
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class AuthError implements Action {
  readonly type = AuthActionTypes.AuthError;

  constructor(public payload?: any) {}
}

export type AuthActionsUnion =
  | GetUser
  | Authenticated
  | NotAuthenticated
  | OAuthLogin
  | Logout
  | AuthError;

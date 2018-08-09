import { Action } from '@ngrx/store';
import { IUser } from '../../models';

export enum AuthActionTypes {
  GetUser = '[Auth] Get User',
  UpdateAccount = '[Auth] Update Account',
  UpdateAccountSuccess = '[Auth] Update Account Success',
  UpdateAccountFail = '[Auth] Update Account Fail',
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
export class UpdateAccount implements Action {
  readonly type = AuthActionTypes.UpdateAccount;
  constructor(public payload: Partial<IUser>) {}
}
export class UpdateAccountSuccess implements Action {
  readonly type = AuthActionTypes.UpdateAccountSuccess;
  constructor(public payload: IUser) {}
}
export class UpdateAccountFail implements Action {
  readonly type = AuthActionTypes.UpdateAccountFail;
  constructor(public payload: any) {}
}
export class Authenticated implements Action {
  readonly type = AuthActionTypes.Authenticated;
  constructor(public payload: IUser) {}
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
  | UpdateAccount
  | UpdateAccountSuccess
  | UpdateAccountFail
  | Authenticated
  | NotAuthenticated
  | OAuthLogin
  | Logout
  | AuthError;

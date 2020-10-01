import { Action } from '@ngrx/store';
import { IUser } from '../_models/user.interface';

export enum AuthActionTypes {
  LoginAction = '[Login] Action',
  LogoutAction = '[Logout] Action'
}

export class Login implements Action {
  readonly type = AuthActionTypes.LoginAction;
  constructor(public payload:{user:IUser}){}
}
export class Logout implements Action {
  readonly type = AuthActionTypes.LogoutAction;
}


export type AuthActions = Login | Logout ;


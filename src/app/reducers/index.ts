import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { IUser } from '../_models/user.interface';
import { AuthActionTypes } from '../auth/auth.actions';
import { routerReducer } from '@ngrx/router-store';

type AuthState = {
  loggedIn:boolean,
  user:IUser
}
const initialAuthState:AuthState = {
  loggedIn:false,
  user:undefined
}
export interface AppState {
  auth:AuthState
}
function authReducer(state:AuthState = initialAuthState,action):AuthState{
    switch (action.type){
      case AuthActionTypes.LoginAction:
      return {
        loggedIn :true,
        user:action.payload.user
      }
      case AuthActionTypes.LogoutAction:
      return {
        loggedIn :false,
        user :undefined
      }
      default:
      return state;
    } 
}
  // router:routerReducer

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer

};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

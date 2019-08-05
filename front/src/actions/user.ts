import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'
import { AppState } from '../store'

import { User } from '../types'
import { signIn, signOut, checkSession } from '../services/signIn'

export enum UserActionTypes {
  REQUEST_CHECK_SESSION = 'REQUEST_CHECK_SESSION',
  RECEIVE_CHECK_SESSION = 'RECEIVE_CHECK_SESSION',
  REQUEST_SIGN_IN = 'REQUEST_SIGN_IN',
  RECEIVE_SIGN_IN = 'RECEIVE_SIGN_IN',
  REQUEST_SIGN_OUT = 'REQUEST_SIGN_OUT',
  RECEIVE_SIGN_OUT = 'RECEIVE_SIGN_OUT'
}

export interface ReceiveCheckSessionAction {
  type: UserActionTypes.RECEIVE_CHECK_SESSION
  user: User | null
}

export interface ReceiveSignInAction {
  type: UserActionTypes.RECEIVE_SIGN_IN
  user: User | null
}

export type UserAction =
  | ReceiveCheckSessionAction
  | ReceiveSignInAction
  | Action<UserActionTypes.REQUEST_CHECK_SESSION>
  | Action<UserActionTypes.REQUEST_SIGN_IN>
  | Action<UserActionTypes.REQUEST_SIGN_OUT>
  | Action<UserActionTypes.RECEIVE_SIGN_OUT>

export function requestSignOut(): ThunkAction<
  void,
  AppState,
  null,
  Action<UserActionTypes.RECEIVE_SIGN_OUT> | Action<UserActionTypes.REQUEST_SIGN_IN>
> {
  return async dispatch => {
    dispatch({ type: UserActionTypes.REQUEST_SIGN_IN })
    await signOut()
    dispatch({ type: UserActionTypes.RECEIVE_SIGN_OUT })
  }
}

export function requestSignIn(): ThunkAction<
  void,
  AppState,
  null,
  ReceiveSignInAction | Action<UserActionTypes.REQUEST_SIGN_IN>
> {
  return async dispatch => {
    dispatch({ type: UserActionTypes.REQUEST_SIGN_IN })
    dispatch({ type: UserActionTypes.RECEIVE_SIGN_IN, user: await signIn() })
  }
}

export function requestCheckSession(): ThunkAction<
  void,
  AppState,
  null,
  ReceiveCheckSessionAction | Action<UserActionTypes.REQUEST_CHECK_SESSION>
> {
  return async dispatch => {
    dispatch({ type: UserActionTypes.REQUEST_CHECK_SESSION })
    dispatch({
      type: UserActionTypes.RECEIVE_CHECK_SESSION,
      user: await checkSession()
    })
  }
}

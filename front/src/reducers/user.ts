import { UserAction, UserActionTypes } from '../actions'
import { User } from '../types'

interface UserState {
  logged: User | null
}

const initialState: UserState = {
  logged: null
}

export default function cities(
  state: UserState = initialState,
  action: UserAction
): UserState {
  switch (action.type) {
    case UserActionTypes.RECEIVE_SIGN_IN:
      return { ...state, logged: action.user }
    case UserActionTypes.RECEIVE_CHECK_SESSION:
      return { ...state, logged: action.user }
    case UserActionTypes.RECEIVE_SIGN_OUT:
      return { ...state, logged: null }
  }

  return state
}

import { AuthActionTypes, AuthActionsUnion } from './auth.actions';
import { User } from '../../models';

export interface State extends User {
  loading?: boolean;
  error?: any;
}

const initialState: State = new User('GUEST');

export function reducer(state: State = initialState, action: AuthActionsUnion) {
  switch (action.type) {
    case AuthActionTypes.GetUser:
    case AuthActionTypes.Logout: {
      return {
        ...state,
        loading: true
      };
    }

    case AuthActionTypes.Authenticated: {
      return {
        ...state,
        ...action.payload,
        loading: false
      };
    }

    case AuthActionTypes.NotAuthenticated: {
      return {
        ...state,
        ...initialState,
        loading: false
      };
    }

    case AuthActionTypes.AuthError: {
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    }

    default: {
      return state;
    }
  }
}

export const isAuthLoading = (state: State) => state.loading;

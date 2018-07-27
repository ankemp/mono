import { ProfileActionTypes, ProfileActionUnion } from './profile.actions';

export interface State {
  profile: any;
  loading: boolean;
  error: any;
}

export const initialState: State = {
  profile: undefined,
  loading: false,
  error: undefined
};

export function reducer(
  state: State = initialState,
  action: ProfileActionUnion
) {
  switch (action.type) {
    case ProfileActionTypes.GetProfile:
    case ProfileActionTypes.UpdateProfile: {
      return {
        ...state,
        loading: true
      };
    }

    case ProfileActionTypes.GetProfileSuccess: {
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    }

    case ProfileActionTypes.UpdateProfileSuccess: {
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    }

    case ProfileActionTypes.GetProfileFail:
    case ProfileActionTypes.UpdateProfileFail: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

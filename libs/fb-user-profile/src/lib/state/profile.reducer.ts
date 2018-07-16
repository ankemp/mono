import { ProfileActionTypes, ProfileActionUnion } from './profile.actions';

export interface State {
  profiles: any[];
  currentProfileUID: string;
  loading: boolean;
  error: any;
}

export const initialState: State = {
  profiles: [],
  currentProfileUID: undefined,
  loading: false,
  error: undefined
};

export function reducer(
  state: State = initialState,
  action: ProfileActionUnion
) {
  switch (action.type) {
    case ProfileActionTypes.GetProfile: {
      return {
        ...state,
        loading: true
      };
    }

    case ProfileActionTypes.GetProfileSuccess: {
      return {
        ...state,
        profiles: [...state.profiles, action.payload],
        currentProfileUID: action.payload.uid,
        loading: false
      };
    }

    case ProfileActionTypes.GetProfileFail: {
      return {
        ...state,
        error: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

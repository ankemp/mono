import { NBActionTypes, NBActionsUnion } from './notification-banner.actions';
import { Banner } from '../../models';

export interface State {
  banners: Banner[];
  activeBanner: string;
}

const initialState: State = {
  banners: [],
  activeBanner: ''
};

export function reducer(
  state: State = initialState,
  action: NBActionsUnion
): State {
  switch (action.type) {
    case NBActionTypes.AddBanner: {
      return {
        ...state,
        banners: [...state.banners, action.payload]
      };
    }

    case NBActionTypes.RemoveBanner:
    case NBActionTypes.DoBannerActionSuccess: {
      return {
        ...state,
        banners: state.banners.filter(({ id }) => id !== action.payload)
      };
    }

    case NBActionTypes.SetBanner: {
      return {
        ...state,
        activeBanner: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

export const getActiveBanner = (state: State) =>
  state.banners.find(b => b.id === state.activeBanner);
export const getTopBanner = (state: State) =>
  state.banners.sort((a, b) => a.index - b.index)[0];

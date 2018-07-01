import { NBActionTypes, NBActionsUnion } from './actions';
import { Banner } from '@mono/notification-banner';

export interface State {
  banners: Banner[];
  activeBanner: string;
}

const initialState: State = {
  banners: [],
  activeBanner: ''
};

export function reducer(state: State = initialState, action: NBActionsUnion): State {
  switch (action.type) {
    case NBActionTypes.AddBanner: {
      return {
        ...state,
        banners: [...state.banners, action.banner]
      }
    }

    case NBActionTypes.RemoveBanner: {
      return {
        ...state,
        banners: state.banners.filter(({ id }) => id !== action.id)
      }
    }

    case NBActionTypes.SetBanner: {
      return {
        ...state,
        activeBanner: action.id
      }
    }

    default: {
      return state;
    }
  }
}

export const getActiveBanner = (state: State) => state.banners.find(b => b.id === state.activeBanner);
export const getTopBanner = (state: State) => state.banners.sort((a, b) => a.index - b.index).shift();

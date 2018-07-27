import { SNActionTypes, SNActionsUnion } from './sidenav.actions';

export interface State {
  isSmallScreen: boolean;
  menuMode: string;
  showSideNav: boolean;
}

const initialState: State = {
  isSmallScreen: false,
  menuMode: 'side',
  showSideNav: true
};

export function reducer(state: State = initialState, action: SNActionsUnion) {
  switch (action.type) {
    case SNActionTypes.SetSmallScreen: {
      return {
        ...state,
        isSmallScreen: action.payload,
        menuMode: action.payload ? 'over' : 'side',
        showSideNav: !action.payload
      };
    }

    case SNActionTypes.ToggleSideNav: {
      return {
        ...state,
        showSideNav: !state.showSideNav
      };
    }

    default: {
      return state;
    }
  }
}

export const getSideNavMode = (state: State) => state.menuMode;
export const getSideNavState = (state: State) => state.showSideNav;

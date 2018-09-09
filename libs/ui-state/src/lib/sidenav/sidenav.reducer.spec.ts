import { State, initialState, reducer } from './sidenav.reducer';
import {
  SNActionTypes,
  SetSmallScreen,
  ToggleSideNav
} from './sidenav.actions';

describe('Sidenav Reducer', () => {
  it('SetSmallScreen', () => {
    const state: State = { ...initialState };
    const action: SetSmallScreen = {
      type: SNActionTypes.SetSmallScreen,
      payload: true
    };
    const result = reducer(state, action);
    expect(result).toEqual({
      ...state,
      isSmallScreen: true,
      menuMode: 'over',
      showSideNav: false
    });
  });

  it('ToggleSideNav', () => {
    const state: State = { ...initialState };
    const action: ToggleSideNav = { type: SNActionTypes.ToggleSideNav };
    const result = reducer(state, action);
    expect(result).toEqual({ ...state, showSideNav: !state.showSideNav });
  });
});

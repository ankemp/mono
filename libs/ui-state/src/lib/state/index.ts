import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap
} from '@ngrx/store';
import * as fromNB from '../notification-banner/reducer';
import * as fromSN from '../sidenav/reducer';

export interface UIState {
  notificationBanner: fromNB.State;
  sidenav: fromSN.State;
}

export const reducers: ActionReducerMap<UIState> = {
  notificationBanner: fromNB.reducer,
  sidenav: fromSN.reducer
};

export const getUIState = createFeatureSelector<UIState>('ui');

// Notification Banner Selectors
export const getNBState = createSelector(
  getUIState,
  state => state.notificationBanner
);
export const getActiveBanner = createSelector(
  getNBState,
  fromNB.getActiveBanner
);
export const getTopBanner = createSelector(getNBState, fromNB.getTopBanner);

// SideNav Selectors
export const getSNState = createSelector(getUIState, state => state.sidenav);
export const getSideNavMode = createSelector(getSNState, fromSN.getSideNavMode);
export const getSideNavState = createSelector(
  getSNState,
  fromSN.getSideNavState
);

import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromNB from '../notification-banner/reducer';

export interface UIState {
  notificationBanner: fromNB.State;
}

export const reducers: ActionReducerMap<UIState> = {
  notificationBanner: fromNB.reducer
}

export const getUIState = createFeatureSelector<UIState>('ui')
export const getNBState = createSelector(getUIState, state => state.notificationBanner);
export const getActiveBanner = createSelector(getNBState, fromNB.getActiveBanner);
export const getTopBanner = createSelector(getNBState, fromNB.getTopBanner);

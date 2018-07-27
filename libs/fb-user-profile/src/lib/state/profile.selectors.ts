import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from './profile.reducer';

export const getProfileState = createFeatureSelector<State>('profile');
export const getCurrentProfile = createSelector(
  getProfileState,
  state => state.profile
);

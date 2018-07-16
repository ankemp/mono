import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from './profile.reducer';

export const getProfileState = createFeatureSelector<State>('profile');
export const getCurrentProfileUID = createSelector(
  getProfileState,
  state => state.currentProfileUID
);
export const getProfiles = createSelector(
  getProfileState,
  state => state.profiles
);
export const getCurrentProfile = createSelector(
  getProfiles,
  getCurrentProfileUID,
  (profiles, currentUID) => profiles.find(p => p.uid === currentUID)
);

import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, isAuthLoading } from './auth.reducer';

export const getAuthState = createFeatureSelector<State>('auth');
export const getCurrentUser = createSelector(getAuthState, state => state);
export const getIsAuthLoading = createSelector(getAuthState, isAuthLoading);

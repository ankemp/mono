import { State, initialState, reducer } from './snackbar.reducer';
import {
  SBActionTypes,
  AddSnackBarSuccess,
  OpenSnackBar,
  CloseSnackbarSuccess
} from './snackbar.actions';
import { SnackBar } from '../../models';

describe('Snackbar Reducer', () => {
  it('AddSuccess', () => {
    const state: State = initialState;
    const snackbar = new SnackBar('Test');
    const action: AddSnackBarSuccess = {
      type: SBActionTypes.AddSuccess,
      payload: snackbar
    };
    const result = reducer(state, action);
    expect(result).toEqual({ ...state, bars: [snackbar] });
  });

  it('Open', () => {
    const snackbar = new SnackBar('Test');
    const state: State = { ...initialState, bars: [snackbar] };
    const action: OpenSnackBar = {
      type: SBActionTypes.Open,
      payload: snackbar
    };
    const result = reducer(state, action);
    expect(result).toEqual({ ...state, active: snackbar.id });
  });

  it('CloseSuccess', () => {
    const snackbar = new SnackBar('Test');
    const state: State = {
      ...initialState,
      bars: [snackbar],
      active: snackbar.id
    };
    const action: CloseSnackbarSuccess = {
      type: SBActionTypes.CloseSuccess,
      payload: snackbar.id
    };
    const result = reducer(state, action);
    expect(!result.bars.find(b => b.id === snackbar.id)).toBeTruthy();
    expect(result.active).toEqual('');
  });
});

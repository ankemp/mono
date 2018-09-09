import { SBActionTypes, SBActionsUnion } from './snackbar.actions';
import { SnackBar, ISnackBar } from '../../models';

export interface State {
  bars: ISnackBar[];
  active: string;
}

export const initialState: State = {
  bars: [],
  active: undefined
};

export function reducer(state: State = initialState, action: SBActionsUnion) {
  switch (action.type) {
    case SBActionTypes.AddSuccess: {
      return {
        ...state,
        bars: [...state.bars, action.payload].sort((a, b) => {
          if (a.priority !== b.priority) {
            return a.priority - b.priority;
          }
          return b.timestamp - a.timestamp;
        })
      };
    }

    case SBActionTypes.Open: {
      return {
        ...state,
        active: action.payload.id
      };
    }

    case SBActionTypes.CloseSuccess: {
      return {
        ...state,
        bars: state.bars.filter(bar => bar.id !== action.payload),
        active: state.active === action.payload ? '' : state.active
      };
    }

    default: {
      return state;
    }
  }
}

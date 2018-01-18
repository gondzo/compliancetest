import { ReportsState, RootAction } from '@src/types';
import {
  resultLoaded,
  errorOccurred,
  setIsRefreshing,
  clearError,
} from './actions';

const defaultState: ReportsState = {
  result: null,
  error: null,
  isRefreshing: false,
};

function reducer(
  state: ReportsState = defaultState,
  action: RootAction,
): ReportsState {
  switch (action.type) {
    case resultLoaded.getType(): {
      return {
        ...state,
        result: action.payload,
      };
    }
    case errorOccurred.getType(): {
      return {
        ...state,
        error: action.payload,
      };
    }
    case clearError.getType(): {
      return {
        ...state,
        error: null,
      };
    }
    case setIsRefreshing.getType(): {
      return {
        ...state,
        isRefreshing: action.payload,
      };
    }
    default:
      return state;
  }
}

export default reducer;

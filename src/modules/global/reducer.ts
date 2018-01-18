import {GlobalState, RootAction} from '@src/types';
import {userLoaded, loading} from './actions';
import {errorOccurred} from '@src/modules/global/actions';

const defaultState: GlobalState = {
  user: null,
  error: null,
  isLoading: false
};

function reducer(state: GlobalState = defaultState, action: RootAction): GlobalState {
  switch (action.type) {
    case userLoaded.getType(): {
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    }
    case loading.getType(): {
      return {
        ...state,
        isLoading: true,
      };
    }
    case errorOccurred.getType(): {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export default reducer;

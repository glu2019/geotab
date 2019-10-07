import { LoadAction } from "../actions";
import { LoadState } from "../store/index";
import { SET_LOADING } from "../constants/index";

const initialState: LoadState = {
  loading: false
};

export function loadReducer(
  state = initialState,
  action: LoadAction
): LoadState {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.loading };
    default:
      return state;
  }
}

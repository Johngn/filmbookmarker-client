import { ActionType } from '../action-types';
import { SearchActions } from '../actions';

interface SearchState {
  loading: boolean;
  films: any;
}

const initialState: SearchState = {
  loading: false,
  films: [],
};

const searchReducer = (
  state = initialState,
  action: SearchActions
): SearchState => {
  switch (action.type) {
    case ActionType.DEFAULT_FILMS:
      return {
        ...state,
        films: action.payload,
        loading: false,
      };
    case ActionType.SEARCH_FILM:
      return {
        ...state,
        films: action.payload,
        loading: false,
      };
    case ActionType.SEARCH_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default searchReducer;

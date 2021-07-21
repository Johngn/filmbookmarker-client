import { ActionType } from '../action-types';
import { HomeActions } from '../actions';

interface HomeState {
  loading: boolean;
  films: any;
}

const initialState: HomeState = {
  loading: false,
  films: [],
};

const homeReducer = (state = initialState, action: HomeActions): HomeState => {
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
    case ActionType.HOME_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default homeReducer;

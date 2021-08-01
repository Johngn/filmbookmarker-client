import { ActionType } from '../action-types';

interface WatchlistState {
  loading: boolean;
  sortedByYear: boolean;
  sortedByTitle: boolean;
  sortedByDuration: boolean;
  ascending: boolean;
  films: any;
}

const initialState = {
  loading: false,
  sortedByYear: false,
  sortedByTitle: false,
  sortedByDuration: false,
  ascending: false,
  films: [],
};

const watchlistReducer = (
  state: WatchlistState = initialState,
  action: any
): WatchlistState => {
  switch (action.type) {
    case ActionType.GET_WATCHLIST:
      return {
        ...state,
        films: action.payload,
        loading: false,
      };

    case ActionType.ADD_FILM_START:
      return {
        ...state,
        loading: true,
      };

    case ActionType.ADD_FILM_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case ActionType.ADD_FILM_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case ActionType.DELETE_FILM:
      return {
        ...state,
        films: state.films.filter((film: any) => film._id !== action.payload),
        loading: false,
      };

    case ActionType.WATCHLIST_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default watchlistReducer;

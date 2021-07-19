import { ActionType } from '../action-types';

interface WatchlistState {
  loading: boolean;
  films: any;
}

const initialState = {
  loading: false,
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
    case ActionType.SORT_WATCHLIST_FILMS:
      const sorted = [...state.films];

      return {
        ...state,
        films: sorted.sort((a, b): number => {
          if (action.payload === 'title') {
            return b['title'] > a['title'] ? -1 : 1;
          } else {
            return b['year'] - a['year'];
          }
        }),
        loading: false,
      };
    case ActionType.ADD_FILM:
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

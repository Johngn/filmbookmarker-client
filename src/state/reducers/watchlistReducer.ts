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
    // case ActionType.SORT_WATCHLIST_FILMS:
    //   return {
    //     ...state,
    //     films: [...state.films].sort((a, b): number => {
    //       if (action.payload === 'title') {
    //         return b['title'] > a['title'] ? -1 : 1;
    //       } else {
    //         return b['year'] - a['year'];
    //       }
    //     }),
    //     loading: false,
    //   };
    case ActionType.SORT_BY_YEAR:
      return {
        ...state,
        films: [...state.films].sort((a, b): number => {
          if (state.ascending && state.sortedByYear) {
            return a['year'] - b['year'];
          } else {
            return b['year'] - a['year'];
          }
        }),
        ascending: state.sortedByYear ? !state.ascending : true,
        sortedByYear: true,
        sortedByTitle: false,
        sortedByDuration: false,
      };
    case ActionType.SORT_BY_TITLE:
      return {
        ...state,
        films: [...state.films].sort((a, b): number => {
          if (state.ascending && state.sortedByTitle) {
            return b['title'] < a['title'] ? -1 : 1;
          } else {
            return b['title'] > a['title'] ? -1 : 1;
          }
        }),
        ascending: state.sortedByTitle ? !state.ascending : true,
        sortedByYear: false,
        sortedByTitle: true,
        sortedByDuration: false,
      };
    case ActionType.SORT_BY_DURATION:
      return {
        ...state,
        films: [...state.films].sort((a, b): number => {
          if (state.ascending && state.sortedByDuration) {
            return b['runtime'] - a['runtime'];
          } else {
            return a['runtime'] - b['runtime'];
          }
        }),
        ascending: state.sortedByDuration ? !state.ascending : true,
        sortedByYear: false,
        sortedByTitle: false,
        sortedByDuration: true,
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

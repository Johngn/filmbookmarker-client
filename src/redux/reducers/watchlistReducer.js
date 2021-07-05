import {
    ADD_FILM,
    DELETE_FILM,
    GET_WATCHLIST,
    WATCHLIST_LOADING,
    SORT_WATCHLIST_FILMS,
} from '../actions/types';

const initialState = {
    loading: false,
    films: [],
};

export default function watchlistReducer(state = initialState, action) {
    switch (action.type) {
        case GET_WATCHLIST:
            return {
                ...state,
                films: action.payload,
                loading: false,
            };
        case SORT_WATCHLIST_FILMS:
            const sorted = [...state.films];

            return {
                ...state,
                films: sorted.sort((a, b) => {
                    if (action.payload === 'title') {
                        return b[action.payload] < a[action.payload];
                    } else {
                        return b[action.payload] - a[action.payload];
                    }
                }),
                loading: false,
            };
        case ADD_FILM:
            return {
                ...state,
                loading: false,
            };
        case DELETE_FILM:
            return {
                ...state,
                films: state.films.filter(film => film._id !== action.payload),
                loading: false,
            };
        case WATCHLIST_LOADING:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
}

import { HOME_LOADING, DEFAULT_FILMS, SEARCH_FILM } from "../actions/types";

const initialState = {
    loading: false,
    films: [],
};

export default function homeReducer(state = initialState, action) {
    switch (action.type) {
        case DEFAULT_FILMS:
            return {
                ...state,
                films: action.payload,
                loading: false,
            };
        case SEARCH_FILM:
            return {
                ...state,
                films: action.payload,
                loading: false,
            };
        case HOME_LOADING:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
}

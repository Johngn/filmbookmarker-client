import { DEFAULT_FILMS, SEARCH_FILM, HOME_LOADING } from './types';
import axios from 'axios';

export const setHomeLoading = () => {
  return {
    type: HOME_LOADING,
  };
};

export const getDefaultFilms = () => async dispatch => {
  dispatch(setHomeLoading());

  const token = axios.defaults.headers.common['x-auth-token'];
  delete axios.defaults.headers.common['x-auth-token']; // This stops CORS error

  const res = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0b94b1025e86742975b86c5a81513b54`
  );

  axios.defaults.headers.common['x-auth-token'] = token;

  dispatch({
    type: DEFAULT_FILMS,
    payload: res.data.results,
  });
};

export const searchFilm = searchTerm => async dispatch => {
  dispatch(setHomeLoading());

  const token = axios.defaults.headers.common['x-auth-token'];
  delete axios.defaults.headers.common['x-auth-token']; // This stops CORS error

  const res = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&query="${searchTerm}"`
  );

  axios.defaults.headers.common['x-auth-token'] = token;

  dispatch({
    type: SEARCH_FILM,
    payload: res.data.results,
  });
};

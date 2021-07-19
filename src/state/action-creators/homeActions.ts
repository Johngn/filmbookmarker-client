import { ActionType } from '../action-types';
import axios from 'axios';

export const setHomeLoading = () => {
  return {
    type: ActionType.HOME_LOADING,
  };
};

export const getDefaultFilms = () => async (dispatch: any) => {
  dispatch(setHomeLoading());

  const token = axios.defaults.headers.common['x-auth-token'];
  delete axios.defaults.headers.common['x-auth-token']; // This stops CORS error

  const res = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}`
  );

  axios.defaults.headers.common['x-auth-token'] = token;

  dispatch({
    type: ActionType.DEFAULT_FILMS,
    payload: res.data.results,
  });
};

export const searchFilm = (searchTerm: string) => async (dispatch: any) => {
  dispatch(setHomeLoading());

  const token = axios.defaults.headers.common['x-auth-token'];
  delete axios.defaults.headers.common['x-auth-token']; // This stops CORS error

  const res = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&query="${searchTerm}"`
  );

  axios.defaults.headers.common['x-auth-token'] = token;

  dispatch({
    type: ActionType.SEARCH_FILM,
    payload: res.data.results,
  });
};

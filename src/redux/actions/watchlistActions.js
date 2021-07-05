import {
  ADD_FILM,
  WATCHLIST_LOADING,
  GET_WATCHLIST,
  DELETE_FILM,
  SET_ALERT,
  REMOVE_ALERT,
  SORT_WATCHLIST_FILMS,
} from './types';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
// import { loadUser } from ".//authActions";

export const setWatchlistLoading = () => {
  return {
    type: WATCHLIST_LOADING,
  };
};

export const setAlert = (msg, alertType) => dispatch => {
  const id = uuid();

  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 1000);
};

export const addFilm = newFilm => dispatch => {
  axios
    .post('/api/films', newFilm)
    .then(res => {
      if (res.status === 200) {
        dispatch(
          {
            type: ADD_FILM,
          },
          dispatch(setAlert('Film added to watchlist', 'success'))
        );
      }
    })
    .catch(err => {
      dispatch(setAlert('Film already on watchlist', 'failure'));
    });
};

export const getWatchlistFilms = userID => dispatch => {
  dispatch(setWatchlistLoading());

  console.log(userID);

  axios.get(`/api/films/${userID}`).then(res => {
    dispatch({
      type: GET_WATCHLIST,
      payload: res.data,
    });
  });
};

export const sortWatchlistFilms = sortBy => dispatch => {
  dispatch({
    type: SORT_WATCHLIST_FILMS,
    payload: sortBy,
  });
};

export const deleteWatchlistFilm = filmId => dispatch => {
  axios.delete(`/api/films/${filmId}`).then(
    () =>
      dispatch({
        type: DELETE_FILM,
        payload: filmId,
      }),
    dispatch(setAlert('Film removed from watchlist', 'success'))
  );
};

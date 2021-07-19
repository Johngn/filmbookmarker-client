import { ActionType } from '../action-types';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
// import { loadUser } from ".//authActions";

export const setWatchlistLoading = () => {
  return {
    type: ActionType.WATCHLIST_LOADING,
  };
};

export const setAlert = (msg: string, alertType: string) => (dispatch: any) => {
  const id = uuid();

  dispatch({
    type: ActionType.SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(
    () => dispatch({ type: ActionType.REMOVE_ALERT, payload: id }),
    1000
  );
};

export const addFilm = (newFilm: any) => (dispatch: any) => {
  axios
    .post('/api/films', newFilm, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    })
    .then(res => {
      if (res.status === 200) {
        dispatch(
          {
            type: ActionType.ADD_FILM,
          },
          dispatch(setAlert('Film added to watchlist', 'success'))
        );
      }
    })
    .catch(err => {
      dispatch(setAlert('Film already on watchlist', 'failure'));
    });
};

export const getWatchlistFilms = (userID: any) => (dispatch: any) => {
  dispatch(setWatchlistLoading());

  axios
    .get(`/api/films/${userID}`, {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    })
    .then(res => {
      dispatch({
        type: ActionType.GET_WATCHLIST,
        payload: res.data,
      });
    });
};

export const sortWatchlistFilms = (sortBy: any) => (dispatch: any) => {
  dispatch({
    type: ActionType.SORT_WATCHLIST_FILMS,
    payload: sortBy,
  });
};

export const deleteWatchlistFilm = (filmId: any) => (dispatch: any) => {
  axios
    .delete(`/api/films/${filmId}`, {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    })
    .then(
      () =>
        dispatch({
          type: ActionType.DELETE_FILM,
          payload: filmId,
        }),
      dispatch(setAlert('Film removed from watchlist', 'success'))
    );
};

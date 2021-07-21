import { ActionType } from '../action-types';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { AlertActions } from '../actions';
import { WatchlistActions } from '../actions';
import { Dispatch } from 'redux';

export const setWatchlistLoading = (): WatchlistActions => {
  return {
    type: ActionType.WATCHLIST_LOADING,
  };
};

export const setAlert = (msg: string, alertType: string): any => {
  return (dispatch: Dispatch<AlertActions>) => {
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
};

export const addFilm = (newFilm: any) => {
  return (dispatch: Dispatch<WatchlistActions>) => {
    console.log(newFilm.id);

    const token = axios.defaults.headers.common['x-auth-token'];
    delete axios.defaults.headers.common['x-auth-token']; // This stops CORS error

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${newFilm.id}?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&language=en-US`
      )
      .then(response => {
        newFilm.runtime = response.data.runtime;

        axios
          .post('/api/films', newFilm, {
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': localStorage.getItem('token'),
            },
          })
          .then(res => {
            if (res.status === 200) {
              dispatch({
                type: ActionType.ADD_FILM,
              });
              dispatch(setAlert('Film added to watchlist', 'success'));
            }
          })
          .catch(() => {
            dispatch(setAlert('Film already on watchlist', 'failure'));
          });
      });

    axios.defaults.headers.common['x-auth-token'] = token;
  };
};

export const getWatchlistFilms = (userID: string) => {
  return (dispatch: Dispatch<WatchlistActions>) => {
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
};

export const sortWatchlistFilms = (sortBy: string) => {
  return (dispatch: Dispatch<WatchlistActions>) => {
    dispatch({
      type: ActionType.SORT_WATCHLIST_FILMS,
      payload: sortBy,
    });
  };
};

export const sortByTitle = () => {
  return (dispatch: Dispatch<WatchlistActions>) => {
    dispatch({
      type: ActionType.SORT_BY_TITLE,
    });
  };
};

export const sortByYear = () => {
  return (dispatch: Dispatch<WatchlistActions>) => {
    dispatch({
      type: ActionType.SORT_BY_YEAR,
    });
  };
};

export const sortByDuration = () => {
  return (dispatch: Dispatch<WatchlistActions>) => {
    dispatch({
      type: ActionType.SORT_BY_DURATION,
    });
  };
};

export const deleteWatchlistFilm = (filmId: string) => {
  return (dispatch: Dispatch<WatchlistActions>) => {
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
};

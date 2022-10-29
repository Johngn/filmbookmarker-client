import { ActionType } from '../action-types';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import UUID from 'uuid-int';
import { AlertActions } from '../actions';
import { WatchlistActions } from '../actions';
import { Dispatch } from 'redux';

const id = 0;
const generator = UUID(id);

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
      3000
    );
  };
};
export const addFilm = (newFilm: any) => {
  return (dispatch: Dispatch<WatchlistActions>) => {
    dispatch({
      type: ActionType.ADD_FILM_START,
    });

    const token = axios.defaults.headers.common['x-auth-token'];
    delete axios.defaults.headers.common['x-auth-token']; // This stops CORS error

    axios
      // .get(
      //   `https://api.themoviedb.org/3/movie/${newFilm.id}?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&language=en-US`
      // )
      .get(
        `//www.omdbapi.com/?t=${newFilm.title.split(' ').join('+')}&y=${
          newFilm.year
        }&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
      )
      .then(({ data }) => {
        if (data.Response === 'True') {
          newFilm.genres = data.Genre.split(', ').map((genre: string) => ({
            id: generator.uuid(),
            name: genre,
          }));
          newFilm.runtime = parseInt(data.Runtime.split(' ')[0]);
          newFilm.ratings = data.Ratings;
        }

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
                type: ActionType.ADD_FILM_SUCCESS,
              });
              dispatch(setAlert('Film added to watchlist', 'success'));
            }
          })
          .catch(() => {
            dispatch({
              type: ActionType.ADD_FILM_FAILURE,
            });
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

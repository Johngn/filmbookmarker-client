import { ActionType } from '../action-types';

// HOME ACTIONS

interface DefaultFilmAction {
  type: ActionType.DEFAULT_FILMS;
  payload: any;
}

interface SearchFilmAction {
  type: ActionType.SEARCH_FILM;
  payload: any;
}

interface HomeLoadingAction {
  type: ActionType.HOME_LOADING;
}

export type HomeActions =
  | DefaultFilmAction
  | SearchFilmAction
  | HomeLoadingAction;

// AUTH ACTIONS

interface RegisterSuccessAction {
  type: ActionType.REGISTER_SUCCESS;
  payload: any;
}

interface RegisterFailAction {
  type: ActionType.REGISTER_FAIL;
}

interface LoginSuccessAction {
  type: ActionType.LOGIN_SUCCESS;
  payload: any;
}

interface LoginFailAction {
  type: ActionType.LOGIN_FAIL;
}

interface UserLoadedAction {
  type: ActionType.USER_LOADED;
  payload: any;
}

interface AuthErrorAction {
  type: ActionType.AUTH_ERROR;
}

interface LogoutAction {
  type: ActionType.LOGOUT;
}

export type AuthActions =
  | RegisterSuccessAction
  | RegisterFailAction
  | LoginSuccessAction
  | LoginFailAction
  | UserLoadedAction
  | AuthErrorAction
  | LogoutAction;

// WATCHLIST ACTIONS

interface wathlistLoadingAction {
  type: ActionType.WATCHLIST_LOADING;
}

interface addFilmAction {
  type: ActionType.ADD_FILM;
}

interface getWatchlistAction {
  type: ActionType.GET_WATCHLIST;
  payload: any;
}

interface sortWatchlistFilmsAction {
  type: ActionType.SORT_WATCHLIST_FILMS;
  payload: string;
}

interface deleteFilmAction {
  type: ActionType.DELETE_FILM;
  payload: string;
}

export type WatchlistActions =
  | wathlistLoadingAction
  | addFilmAction
  | getWatchlistAction
  | sortWatchlistFilmsAction
  | deleteFilmAction;

// ALERT ACTIONS

interface setAlertAction {
  type: ActionType.SET_ALERT;
  payload: any;
}

interface removeAlertAction {
  type: ActionType.REMOVE_ALERT;
  payload: string;
}

export type AlertActions = setAlertAction | removeAlertAction;

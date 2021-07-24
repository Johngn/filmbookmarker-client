import { ActionType } from '../action-types';
import { setAlert } from './watchlistActions';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import { AuthActions } from '../actions';
import { Dispatch } from 'redux';

export const setLoading = () => {
  return async (dispatch: Dispatch<AuthActions>) => {
    dispatch({
      type: ActionType.LOADING,
    });
  };
};

// Load user
export const loadUser = (): any => {
  return async (dispatch: Dispatch<AuthActions>) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);

      try {
        const res = await axios.get('/api/auth');

        dispatch({
          type: ActionType.USER_LOADED,
          payload: res.data,
        });
      } catch (err) {
        dispatch({
          type: ActionType.AUTH_ERROR,
        });
      }
    }
  };
};

export const registerUser = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return async (dispatch: Dispatch<AuthActions>) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post('/api/users', body, config);

      dispatch({
        type: ActionType.REGISTER_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (error: any) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((error: any) =>
          dispatch(setAlert(error.msg, 'failure'))
        );
      }

      dispatch({
        type: ActionType.REGISTER_FAIL,
      });
    }
  };
};

export const loginUser = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return async (dispatch: Dispatch<AuthActions>) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post('/api/auth', body, config);

      dispatch({
        type: ActionType.LOGIN_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (error: any) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((error: any) =>
          dispatch(setAlert(error.msg, 'failure'))
        );
      }

      dispatch({
        type: ActionType.LOGIN_FAIL,
      });
    }
  };
};

export const logout = () => {
  return (dispatch: Dispatch<AuthActions>) => {
    dispatch({
      type: ActionType.LOGOUT,
    });
  };
};

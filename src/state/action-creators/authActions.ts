import { ActionType } from '../action-types';
import { setAlert } from './watchlistActions';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

// Load user
export const loadUser = () => async (dispatch: any) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

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
};

interface UserProps {
  email: string;
  password: string;
}

export const registerUser =
  ({ email, password }: UserProps) =>
  async (dispatch: any) => {
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
    } catch (err: any) {
      const errors = err.response.data.errors;

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

export const loginUser =
  ({ email, password }: UserProps) =>
  async (dispatch: any) => {
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
    } catch (err: any) {
      const errors = err.response.data.errors;

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

export const logout = () => (dispatch: any) => {
  dispatch({
    type: ActionType.LOGOUT,
  });
};

import { ActionType } from '../action-types';

interface UserState {
  _id: string;
  email: string;
  date: string;
  __v: number;
  films: string[];
}

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  user: UserState;
}

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: false,
  user: {
    _id: '',
    email: '',
    date: '',
    __v: 0,
    films: [],
  },
};

const authReducer = (
  state: AuthState = initialState,
  action: any
): AuthState => {
  const { type, payload } = action;

  switch (type) {
    case ActionType.LOADING:
      return {
        ...state,
        loading: true,
      };
    case ActionType.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case ActionType.REGISTER_SUCCESS:
    case ActionType.LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
      };
    case ActionType.REGISTER_FAIL:
    case ActionType.LOGIN_FAIL:
    case ActionType.AUTH_ERROR:
    case ActionType.LOGOUT:
      localStorage.removeItem('token');
      return {
        token: null,
        isAuthenticated: false,
        loading: false,
        user: {
          _id: '',
          email: '',
          date: '',
          __v: 0,
          films: [],
        },
      };
    default:
      return state;
  }
};

export default authReducer;

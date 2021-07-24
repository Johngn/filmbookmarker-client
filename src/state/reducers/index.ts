import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import watchlistReducer from './watchlistReducer';
import alertReducer from './alertReducer';
import authReducer from './authReducer';

const reducers = combineReducers({
  films: searchReducer,
  watchlist: watchlistReducer,
  alert: alertReducer,
  auth: authReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;

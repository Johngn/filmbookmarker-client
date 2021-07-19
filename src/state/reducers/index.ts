import { combineReducers } from 'redux';
import homeReducer from './homeReducer';
import watchlistReducer from './watchlistReducer';
import alertReducer from './alertReducer';
import authReducer from './authReducer';

const reducers = combineReducers({
  films: homeReducer,
  watchlist: watchlistReducer,
  alert: alertReducer,
  auth: authReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;

import { combineReducers } from "redux";
import homeReducer from "./homeReducer";
import watchlistReducer from "./watchlistReducer";
import alertReducer from "./alertReducer";
import authReducer from "./authReducer";

export default combineReducers({
    films: homeReducer,
    watchlist: watchlistReducer,
    alert: alertReducer,
    auth: authReducer,
});

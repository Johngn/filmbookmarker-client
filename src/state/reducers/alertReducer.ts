import { ActionType } from '../action-types';
import { AlertActions } from '../actions';

interface AlertState {
  alertType: string;
  id: number;
  msg: string;
}

const initialState: AlertState[] = [];

const alertReducer = (
  state = initialState,
  action: AlertActions
): AlertState[] => {
  const { type, payload } = action;

  switch (type) {
    case ActionType.SET_ALERT:
      return [...state, payload];
    case ActionType.REMOVE_ALERT:
      return [];
    default:
      return state;
  }
};

export default alertReducer;

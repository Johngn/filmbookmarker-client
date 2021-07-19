import { ActionType } from '../action-types';

const initialState: any[] = [];

const alertReducer = (state: any = initialState, action: any): any => {
  const { type, payload } = action;

  switch (type) {
    case ActionType.SET_ALERT:
      return [...state, payload];
    case ActionType.REMOVE_ALERT:
      return state.filter((alert: any) => alert.id !== payload);
    default:
      return state;
  }
};

export default alertReducer;

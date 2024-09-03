import * as ActionTypes from '../actionTypes/userActionType';

const initialState = {
  day: null,
  year: null,
  loggedInUser: null,
  message: ``,
  createdLogToday: null,
  token: null,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_TOKEN:
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

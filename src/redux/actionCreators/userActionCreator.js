import * as ActionTypes from '../actionTypes/userActionType';

export const setToken = (token) => async (dispatch) => {
  await localStorage.setItem('token', JSON.stringify(token))
  dispatch(setTokenReducer(token))
}

export const getToken = () => async (dispatch) => {
  let token = await localStorage.getItem('token');
  dispatch(setTokenReducer(token))
}

export const setTokenReducer = token => ({
  type: ActionTypes.SET_TOKEN,
  payload: token
})

export const logOutRedux = () => async (dispatch) => {
  await localStorage.clear()
  dispatch(logout())
}

const logout = () => ({
  type: ActionTypes.LOG_OUT
})
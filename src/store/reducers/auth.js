import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: localStorage.getItem('token'),
  userId: localStorage.getItem('userId'),
  username: localStorage.getItem('username'),
  error: null,
  loading: false,
};

const signUpRequest = (state) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};

const signUpSuccess = (state) => {
  return {
    ...state,
    error: null,
    loading: false,
  };
};

const signUpFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const signInRequest = (state) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};

const signInSuccess = (state, action) => {
  return {
    ...state,
    token: action.token,
    userId: action.userId,
    username: action.username,
    error: null,
    loading: false,
  };
};

const signInFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const logOut = (state) => {
  return {
    ...state,
    token: null,
    userId: null,
    username: null,
  };
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_UP_REQUEST:
      return signUpRequest(state, action);
    case actionTypes.SIGN_UP_SUCCESS:
      return signUpSuccess(state, action);
    case actionTypes.SIGN_UP_FAIL:
      return signUpFail(state, action);
    case actionTypes.SIGN_IN_REQUEST:
      return signInRequest(state, action);
    case actionTypes.SIGN_IN_SUCCESS:
      return signInSuccess(state, action);
    case actionTypes.SIGN_IN_FAIL:
      return signInFail(state, action);
    case actionTypes.LOG_OUT:
      return logOut(state, action);
    default:
      return state;
  }
};

export default authReducer;

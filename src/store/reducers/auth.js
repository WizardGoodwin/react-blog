import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: localStorage.getItem('token'),
  userId: localStorage.getItem('userId'),
  error: null,
  loading: false,
  authRedirectPath: '/',
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
    token: action.idToken,
    userId: action.userId,
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

const authLogout = (state) => {
  return {
    ...state,
    token: null,
    userId: null,
  };
};

const setAuthRedirectPath = (state, action) => {
  return {
    ...state,
    authRedirectPath: action.path,
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
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default authReducer;

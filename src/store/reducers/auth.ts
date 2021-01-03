import { AuthAction, ISignInFail, ISignInSuccess, ISignUpFail, ISignUpSuccess } from '../actions/auth';
import { ActionTypes } from '../actions/actionTypes';

export interface IAuthState {
  token: string;
  userId: string | null;
  username: string;
  error?: any;
  loading: boolean;
}

const initialState: IAuthState = {
  token: localStorage.getItem('token') || '',
  userId: localStorage.getItem('userId'),
  username: localStorage.getItem('username') || '',
  error: null,
  loading: false,
};

const signUpRequest = (state: IAuthState): IAuthState => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};

const signUpSuccess = (state: IAuthState, action: ISignUpSuccess): IAuthState => {
  return {
    ...state,
    token: action.token,
    userId: action.userId,
    username: action.username,
    error: null,
    loading: false,
  };
};

const signUpFail = (state: IAuthState, action: ISignUpFail): IAuthState => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const signInRequest = (state: IAuthState): IAuthState => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};

const signInSuccess = (state: IAuthState, action: ISignInSuccess): IAuthState => {
  return {
    ...state,
    token: action.token,
    userId: action.userId,
    username: action.username,
    error: null,
    loading: false,
  };
};

const signInFail = (state: IAuthState, action: ISignInFail): IAuthState => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const logOut = (state: IAuthState): IAuthState => {
  return {
    ...state,
    token: '',
    userId: null,
    username: '',
  };
};

const authReducer = (state: IAuthState = initialState, action: AuthAction) => {
  switch (action.type) {
    case ActionTypes.SIGN_UP_REQUEST:
      return signUpRequest(state);
    case ActionTypes.SIGN_UP_SUCCESS:
      return signUpSuccess(state, action);
    case ActionTypes.SIGN_UP_FAIL:
      return signUpFail(state, action);
    case ActionTypes.SIGN_IN_REQUEST:
      return signInRequest(state);
    case ActionTypes.SIGN_IN_SUCCESS:
      return signInSuccess(state, action);
    case ActionTypes.SIGN_IN_FAIL:
      return signInFail(state, action);
    case ActionTypes.LOG_OUT:
      return logOut(state);
    default:
      return state;
  }
};

export default authReducer;

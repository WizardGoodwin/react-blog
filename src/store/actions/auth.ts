import axios from '../../axios';

import { ActionTypes } from './actionTypes';
import { IUser } from '../../interfaces/user.interface';
import { IAuthResponse, IUserPostResponse, UserResponse } from '../../interfaces/api-responses';
import { ISignInForm } from '../../pages/SignIn/SignIn';
import { ISignUpForm } from '../../pages/SignUp/SignUp';
import { SIGN_IN_URL, SIGN_UP_URL } from '../../shared/constants';
import { AppThunkAction, AppThunkDispatch } from '../store';

export interface ISignUpRequest {
  type: ActionTypes.SIGN_UP_REQUEST
}

export interface ISignUpSuccess {
  type: ActionTypes.SIGN_UP_SUCCESS;
  token: string;
  userId: string;
  username: string;
}

export interface ISignUpFail {
  type: ActionTypes.SIGN_UP_FAIL;
  error: string;
}

export interface ISignInRequest {
  type: ActionTypes.SIGN_IN_REQUEST
}

export interface ISignInSuccess {
  type: ActionTypes.SIGN_IN_SUCCESS;
  token: string;
  userId: string;
  username: string;
}

export interface ISignInFail {
  type: ActionTypes.SIGN_IN_FAIL;
  error: string;
}

export interface ILogOut {
  type: ActionTypes.LOG_OUT;
}

const signUpRequest = (): ISignUpRequest => {
  return {
    type: ActionTypes.SIGN_UP_REQUEST,
  };
};

const signUpSuccess = (token: string, userId: string, username: string): ISignUpSuccess => {
  return {
    type: ActionTypes.SIGN_UP_SUCCESS,
    token,
    userId,
    username,
  };
};

const signUpFail = (error: string): ISignUpFail => {
  return {
    type: ActionTypes.SIGN_UP_FAIL,
    error,
  };
};

const signInRequest = (): ISignInRequest => {
  return {
    type: ActionTypes.SIGN_IN_REQUEST,
  };
};

const signInSuccess = (token: string, userId: string, username: string): ISignInSuccess => {
  return {
    type: ActionTypes.SIGN_IN_SUCCESS,
    token,
    userId,
    username,
  };
};

const signInFail = (error: string): ISignInFail => {
  return {
    type: ActionTypes.SIGN_IN_FAIL,
    error,
  };
};

export const logOut = (): ILogOut => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('username');
  return {
    type: ActionTypes.LOG_OUT,
  };
};

export const signUp = (authData: ISignUpForm): AppThunkAction<AuthAction> => {
  return async (dispatch: AppThunkDispatch<AuthAction>) => {
    dispatch(signUpRequest());
    try {
      const authResponse: IAuthResponse = await axios.post(SIGN_UP_URL, { ...authData, returnSecureToken: true });
      const token = authResponse.data.idToken;
      const tempId = authResponse.data.localId;
      localStorage.setItem('token', token);
      const user: IUser = {
        id: tempId,
        email: authData.email,
        username: authData.username,
        name: '',
        phone: '',
        address: '',
        website: '',
      };
      // sending request to create user entity in firebase database
      // (sign up action doesn't create user entity in db - feature of firebase)
      const userResponse: IUserPostResponse = await axios.post('/users.json', user);
      const userId = userResponse.data.name;
      localStorage.setItem('userId', userId);
      dispatch(signUpSuccess(token, userId, authData.username));
    } catch(err) {
      dispatch(signUpFail(err.response.data.error));
    }
  };
};

export const signIn = (authData: ISignInForm): AppThunkAction<AuthAction> => {
  return async (dispatch: AppThunkDispatch<AuthAction>) => {
    dispatch(signInRequest());
    try {
      const authResponse: IAuthResponse = await axios.post(SIGN_IN_URL, { ...authData, returnSecureToken: true });
      const token = authResponse.data.idToken;
      const tempId = authResponse.data.localId;
      // finding user in firebase database and setting to local storage his id and username
      const usersResponse = await axios.get('/users.json');
      const users: UserResponse[] = Object.entries(usersResponse.data);
      const user = users.find((user: UserResponse) => user[1].id === tempId);
      if (user) {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', user[0]);
        localStorage.setItem('username', user[1].username);
        dispatch(signInSuccess(token, user[0], user[1].username));
      } else throw new Error('User not found');
    } catch(err) {
      dispatch(signInFail(err.response.data.error));
    }
  };
};

export type AuthAction = ISignInRequest | ISignInSuccess | ISignInFail | ISignUpRequest | ISignUpSuccess | ISignUpFail | ILogOut;

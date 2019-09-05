import axios from '../../axios';

import { ActionTypes } from './actionTypes';
import { IUser } from '../../interfaces/user.interface';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import {
  IAuthResponse,
  IError,
  IUserPostResponse
} from '../../interfaces/api-responses';

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

export const signUp = (authData: IUser): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(signUpRequest());
    const url =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDl7p6TD5rS_sYqeXIeRsToBEpXbjk36F4';

    axios
      .post(url, { ...authData, returnSecureToken: true })
      .then((response: IAuthResponse) => {
        const token = response.data.idToken;
        const tempId = response.data.localId;
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
        axios
          .post('/users.json', user)
          .then((response: IUserPostResponse) => {
            const userId = response.data.name;
            localStorage.setItem('userId', userId);
            dispatch(signUpSuccess(token, userId, authData.username));
          })
          .catch((err: IError) => {
            dispatch(signUpFail(err.response.data.error));
          });
      })
      .catch((err: IError) => {
        dispatch(signUpFail(err.response.data.error));
      });
  };
};

export const signIn = (authData: IUser): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(signInRequest());
    const url =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDl7p6TD5rS_sYqeXIeRsToBEpXbjk36F4';

    axios
      .post(url, { ...authData, returnSecureToken: true })
      .then((response: IAuthResponse) => {
        const token = response.data.idToken;
        const tempId = response.data.localId;
        // finding user in firebase database and setting to local storage his id and username
        axios
          .get('/users.json')
          .then((response) => {
            const users: any[] = Object.entries(response.data);
            const user = users.find((user: any) => user[1].id === tempId);
            localStorage.setItem('token', token);
            localStorage.setItem('userId', user[0]);
            localStorage.setItem('username', user[1].username);
            dispatch(signInSuccess(token, user[0], user[1].username));
          })
          .catch((err: IError) => {
            dispatch(signInFail(err.response.data.error));
          });
      })
      .catch((err: IError) => {
        dispatch(signInFail(err.response.data.error));
      });
  };
};

export type AuthAction = ISignInRequest | ISignInSuccess | ISignInFail | ISignUpRequest | ISignUpSuccess | ISignUpFail | ILogOut;

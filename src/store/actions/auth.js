import axios from 'axios';

import * as actionTypes from './actionTypes';

export const signUpRequest = () => {
  return {
    type: actionTypes.SIGN_UP_REQUEST,
  };
};

export const signUpSuccess = () => {
  return {
    type: actionTypes.SIGN_UP_SUCCESS,
  };
};

export const signUpFail = (error) => {
  return {
    type: actionTypes.SIGN_UP_FAIL,
    error: error,
  };
};

export const signInRequest = () => {
  return {
    type: actionTypes.SIGN_IN_REQUEST,
  };
};

export const signInSuccess = (token, userId) => {
  return {
    type: actionTypes.SIGN_IN_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const signInFail = (error) => {
  return {
    type: actionTypes.SIGN_IN_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const signUp = (email, password) => {
  return (dispatch) => {
    dispatch(signUpRequest());
    const authData = {
      email: email,
      password: password,
    };
    const url =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDl7p6TD5rS_sYqeXIeRsToBEpXbjk36F4';

    axios
      .post(url, authData)
      .then(() => {
        dispatch(signUpSuccess());
      })
      .catch((err) => {
        dispatch(signUpFail(err.response.data.error));
      });
  };
};

export const signIn = (email, password) => {
  return (dispatch) => {
    dispatch(signInRequest());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    const url =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDl7p6TD5rS_sYqeXIeRsToBEpXbjk36F4';

    axios
      .post(url, authData)
      .then((response) => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000,
        );
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);
        dispatch(signInSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((err) => {
        dispatch(signInFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(signInSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000,
          ),
        );
      }
    }
  };
};

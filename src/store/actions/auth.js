import axios from '../../axios';

import * as actionTypes from './actionTypes';

export const signUpRequest = () => {
  return {
    type: actionTypes.SIGN_UP_REQUEST,
  };
};

export const signUpSuccess = (token, userId) => {
  return {
    type: actionTypes.SIGN_UP_SUCCESS,
    token: token,
    userId: userId,
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
    token: token,
    userId: userId,
  };
};

export const signInFail = (error) => {
  return {
    type: actionTypes.SIGN_IN_FAIL,
    error: error,
  };
};

export const logOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.LOG_OUT,
  };
};

export const signUp = (authData) => {
  return (dispatch) => {
    dispatch(signUpRequest());
    const url =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDl7p6TD5rS_sYqeXIeRsToBEpXbjk36F4';

    axios
      .post(url, { ...authData, returnSecureToken: true })
      .then((response) => {
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('userId', response.data.localId);
        const user = {
          id: response.data.localId,
          email: authData.email,
          username: authData.username,
        };
        axios
          .post('/users.json', user)
          .then(() => {
            dispatch(
              signUpSuccess(response.data.idToken, response.data.localId),
            );
          })
          .catch((err) => {
            dispatch(signUpFail(err.response.data.error));
          });
      })
      .catch((err) => {
        dispatch(signUpFail(err.response.data.error));
      });
  };
};

export const signIn = (authData) => {
  return (dispatch) => {
    dispatch(signInRequest());
    const url =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDl7p6TD5rS_sYqeXIeRsToBEpXbjk36F4';

    axios
      .post(url, { ...authData, returnSecureToken: true })
      .then((response) => {
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('userId', response.data.localId);
        dispatch(signInSuccess(response.data.idToken, response.data.localId));
      })
      .catch((err) => {
        dispatch(signInFail(err.response.data.error));
      });
  };
};

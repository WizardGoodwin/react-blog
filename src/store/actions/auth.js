import axios from '../../axios';

import * as actionTypes from './actionTypes';

const signUpRequest = () => {
  return {
    type: actionTypes.SIGN_UP_REQUEST,
  };
};

const signUpSuccess = (token, userId) => {
  return {
    type: actionTypes.SIGN_UP_SUCCESS,
    token: token,
    userId: userId,
  };
};

const signUpFail = (error) => {
  return {
    type: actionTypes.SIGN_UP_FAIL,
    error: error,
  };
};

const signInRequest = () => {
  return {
    type: actionTypes.SIGN_IN_REQUEST,
  };
};

const signInSuccess = (token, userId, username) => {
  return {
    type: actionTypes.SIGN_IN_SUCCESS,
    token: token,
    userId: userId,
    username: username,
  };
};

const signInFail = (error) => {
  return {
    type: actionTypes.SIGN_IN_FAIL,
    error: error,
  };
};

export const logOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('username');
  return {
    type: actionTypes.LOG_OUT
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
        localStorage.setItem('userTempId', response.data.localId);
        const user = {
          id: response.data.localId,
          email: authData.email,
          username: authData.username,
          name: '',
          phone: '',
          address: '',
          website: '',
        };
        axios
          .post('/users.json', user)
          .then((response) => {
            localStorage.setItem('userId', response.data.name);
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
        const token = response.data.idToken;
        const tempId = response.data.localId;
        axios
          .get('/users.json')
          .then((response) => {
            const users = Object.entries(response.data);
            const user = users.find((user) => user[1].id === tempId);
            localStorage.setItem('token', token);
            localStorage.setItem('userId', user[0]);
            localStorage.setItem('username', user[1].username);
            dispatch(signInSuccess(token, user[0], user[1].username));
          })
          .catch((err) => {
            dispatch(signInFail(err.response.data.error));
          });
      })
      .catch((err) => {
        dispatch(signInFail(err.response.data.error));
      });
  };
};

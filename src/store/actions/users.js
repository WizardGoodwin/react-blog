import axios from '../../axios';
import * as actionTypes from './actionTypes';

const getUsersRequest = () => {
  return {
    type: actionTypes.GET_USERS_REQUEST,
  };
};

const getUsersSuccess = (users) => {
  return {
    type: actionTypes.GET_USERS_SUCCESS,
    users: users,
  };
};

const getUsersFail = (error) => {
  return {
    type: actionTypes.GET_USERS_FAIL,
    error: error,
  };
};

const getUserByIdRequest = () => {
  return {
    type: actionTypes.GET_USER_BY_ID_REQUEST,
  };
};

const getUserByIdSuccess = (user) => {
  return {
    type: actionTypes.GET_USER_BY_ID_SUCCESS,
    user: user,
  };
};

const getUserByIdFail = (error) => {
  return {
    type: actionTypes.GET_USER_BY_ID_FAIL,
    error: error,
  };
};

const updateUserRequest = () => {
  return {
    type: actionTypes.UPDATE_USER_REQUEST,
  };
};

const updateUserSuccess = (user) => {
  return {
    type: actionTypes.UPDATE_USER_SUCCESS,
    user: user,
  };
};

const updateUserFail = (error) => {
  return {
    type: actionTypes.UPDATE_USER_FAIL,
    error: error,
  };
};

export const getUsers = () => {
  return (dispatch) => {
    dispatch(getUsersRequest());
    axios
      .get('/users.json')
      .then((response) => {
        dispatch(getUsersSuccess(Object.values(response.data)));
      })
      .catch((err) => {
        dispatch(getUsersFail(err.response.data.error));
      });
  };
};

export const getUserById = () => {
  const id = localStorage.getItem('userId');
  return (dispatch) => {
    dispatch(getUserByIdRequest());
    axios
      .get(`/users/${id}.json`)
      .then((response) => {
        dispatch(getUserByIdSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getUserByIdFail(err.response.data.error));
      });
  };
};

export const updateUser = (user) => {
  const id = localStorage.getItem('userId');
  return (dispatch) => {
    dispatch(updateUserRequest());
    axios
      .put(`/users/${id}.json`, user)
      .then((response) => {
        dispatch(updateUserSuccess(response.data));
      })
      .catch((err) => {
        dispatch(updateUserFail(err.response.data.error));
      });
  };
};

import axios from '../../axios';
import * as actionTypes from './actionTypes';

export const getUsersRequest = () => {
  return {
    type: actionTypes.GET_USERS_REQUEST,
  };
};

export const getUsersSuccess = (users) => {
  return {
    type: actionTypes.GET_USERS_SUCCESS,
    users: users,
  };
};

export const getUsersFail = (error) => {
  return {
    type: actionTypes.GET_USERS_FAIL,
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
        console.log(err.response);
        dispatch(getUsersFail(err.response.data.error));
      });
  };
};

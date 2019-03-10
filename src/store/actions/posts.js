import axios from '../../axios';
import * as actionTypes from './actionTypes';

export const addPostRequest = () => {
  return {
    type: actionTypes.ADD_POST_REQUEST,
  };
};

export const addPostSuccess = (post) => {
  return {
    type: actionTypes.ADD_POST_SUCCESS,
    post: post,
  };
};

export const addPostFail = (error) => {
  return {
    type: actionTypes.ADD_POST_FAIL,
    error: error,
  };
};

export const addPost = (post) => {
  return (dispatch) => {
    dispatch(addPostRequest());
    axios
      .post(`/posts.json`, post)
      .then((response) => {
        console.log(response.data);
        dispatch(addPostSuccess(response.data));
      })
      .catch((err) => {
        dispatch(addPostFail(err.response.data.error));
      });
  };
};

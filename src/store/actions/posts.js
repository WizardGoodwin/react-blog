import axios from '../../axios';
import * as actionTypes from './actionTypes';

const addPostRequest = () => {
  return {
    type: actionTypes.ADD_POST_REQUEST,
  };
};

const addPostSuccess = (post) => {
  return {
    type: actionTypes.ADD_POST_SUCCESS,
    post: post,
  };
};

const addPostFail = (error) => {
  return {
    type: actionTypes.ADD_POST_FAIL,
    error: error,
  };
};

const getPostsRequest = () => {
  return {
    type: actionTypes.GET_POSTS_REQUEST,
  };
};

const getPostsSuccess = (posts) => {
  return {
    type: actionTypes.GET_POSTS_SUCCESS,
    posts: posts,
  };
};

const getPostsFail = (error) => {
  return {
    type: actionTypes.GET_POSTS_FAIL,
    error: error,
  };
};

const updatePostRequest = () => {
  return {
    type: actionTypes.UPDATE_POST_REQUEST,
  };
};

const updatePostSuccess = (post) => {
  return {
    type: actionTypes.UPDATE_POST_SUCCESS,
    post: post,
  };
};

const updatePostFail = (error) => {
  return {
    type: actionTypes.UPDATE_POST_FAIL,
    error: error,
  };
};

const deletePostRequest = () => {
  return {
    type: actionTypes.DELETE_POST_REQUEST,
  };
};

const deletePostSuccess = (post) => {
  return {
    type: actionTypes.DELETE_POST_SUCCESS,
  };
};

const deletePostFail = (error) => {
  return {
    type: actionTypes.DELETE_POST_FAIL,
    error: error,
  };
};

export const addPost = (newPost) => {
  const date = new Date().toLocaleString();
  const post = {...newPost, created_at: date};
  return (dispatch) => {
    dispatch(addPostRequest());
    axios
      .post(`/posts.json`, post)
      .then(() => {
        dispatch(addPostSuccess(post));
      })
      .catch((err) => {
        dispatch(addPostFail(err.response.data.error));
      });
  };
};

export const getPosts = () => {
  return (dispatch) => {
    dispatch(getPostsRequest());
    axios
      .get('/posts.json')
      .then((response) => {
        dispatch(getPostsSuccess(Object.values(response.data)));
      })
      .catch((err) => {
        dispatch(getPostsFail(err.response.data.error));
      });
  };
};

export const updatePost = (post) => {
  return (dispatch) => {
    dispatch(updatePostRequest());
    axios
      .put('/posts.json')
      .then((response) => {
        //dispatch(updatePostSuccess(Object.values(response.data)));
      })
      .catch((err) => {
        dispatch(updatePostFail(err.response.data.error));
      });
  };
};

export const deletePost = (post) => {
  return (dispatch) => {
    dispatch(deletePostRequest());
    axios
      .delete('/posts.json')
      .then((response) => {
        //dispatch(deletePostSuccess(Object.values(response.data)));
      })
      .catch((err) => {
        dispatch(deletePostFail(err.response.data.error));
      });
  };
};


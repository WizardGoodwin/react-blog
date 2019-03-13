import axios from '../../axios';
import * as actionTypes from './actionTypes';

const addPostRequest = () => {
  return {
    type: actionTypes.ADD_POST_REQUEST,
  };
};

const addPostSuccess = (id, post) => {
  return {
    type: actionTypes.ADD_POST_SUCCESS,
    id,
    post,
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

const updatePostSuccess = (id, post) => {
  return {
    type: actionTypes.UPDATE_POST_SUCCESS,
    id,
    post,
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

const deletePostSuccess = (id) => {
  return {
    type: actionTypes.DELETE_POST_SUCCESS,
    id,
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
  const author = localStorage.getItem('username');
  const post = { ...newPost, created_at: date, author };
  return (dispatch) => {
    dispatch(addPostRequest());
    axios
      .post(`/posts.json`, post)
      .then((response) => {
        const id = response.data.name;
        dispatch(addPostSuccess(id, post));
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
        //convert response object to array of arrays kind of [ id : post ]
        const posts = Object.entries(response.data);
        dispatch(getPostsSuccess(posts));
      })
      .catch((err) => {
        dispatch(getPostsFail(err.response.data.error));
      });
  };
};

export const updatePost = (id, editedPost) => {
  const date = new Date().toLocaleString();
  const post = { ...editedPost, created_at: date };
  return (dispatch) => {
    dispatch(updatePostRequest());
    axios
      .put(`/posts/${id}.json`, post)
      .then(() => {
        dispatch(updatePostSuccess(id, post));
      })
      .catch((err) => {
        dispatch(updatePostFail(err.response.data.error));
      });
  };
};

export const deletePost = (id) => {
  return (dispatch) => {
    dispatch(deletePostRequest());
    axios
      .delete(`/posts/${id}.json`)
      .then(() => {
        dispatch(deletePostSuccess(id));
      })
      .catch((err) => {
        dispatch(deletePostFail(err.response.data.error));
      });
  };
};

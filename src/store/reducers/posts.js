import * as actionTypes from '../actions/actionTypes';

const initialState = {
  posts: [],
  post: {},
  error: null,
  postLoading: true,
  postUpdating: false,
  postsLoading: true,
};

const addPostRequest = (state) => {
  return {
    ...state,
    error: null,
  };
};

const addPostSuccess = (state, action) => {
  return {
    ...state,
    error: null,
    posts: state.posts.concat(action.post),
  };
};

const addPostFail = (state, action) => {
  return {
    ...state,
    error: action.error,
  };
};

const getPostsRequest = (state) => {
  return {
    ...state,
    error: null,
    postsLoading: true,
  };
};

const getPostsSuccess = (state, action) => {
  return {
    ...state,
    posts: action.posts,
    error: null,
    postsLoading: false,
  };
};

const getPostsFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    postsLoading: false,
  };
};

const updatePostRequest = (state) => {
  return {
    ...state,
    error: null,
    postUpdating: true,
  };
};

const updatePostSuccess = (state, action) => {
  return {
    ...state,
    post: action.post,
    error: null,
    postUpdating: false,
  };
};

const updatePostFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    postUpdating: false,
  };
};

const deletePostRequest = (state) => {
  return {
    ...state,
    error: null,
    postUpdating: true,
  };
};

const deletePostSuccess = (state, action) => {
  return {
    ...state,
    error: null,
    postUpdating: false,
  };
};

const deletePostFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    postUpdating: false,
  };
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_POST_REQUEST:
      return addPostRequest(state, action);
    case actionTypes.ADD_POST_SUCCESS:
      return addPostSuccess(state, action);
    case actionTypes.ADD_POST_FAIL:
      return addPostFail(state, action);
    case actionTypes.GET_POSTS_REQUEST:
      return getPostsRequest(state, action);
    case actionTypes.GET_POSTS_SUCCESS:
      return getPostsSuccess(state, action);
    case actionTypes.GET_POSTS_FAIL:
      return getPostsFail(state, action);
    case actionTypes.UPDATE_POST_REQUEST:
      return updatePostRequest(state, action);
    case actionTypes.UPDATE_POST_SUCCESS:
      return updatePostSuccess(state, action);
    case actionTypes.UPDATE_POST_FAIL:
      return updatePostFail(state, action);
    case actionTypes.DELETE_POST_REQUEST:
      return deletePostRequest(state, action);
    case actionTypes.DELETE_POST_SUCCESS:
      return deletePostSuccess(state, action);
    case actionTypes.DELETE_POST_FAIL:
      return deletePostFail(state, action);
    default:
      return state;
  }
};

export default postsReducer;
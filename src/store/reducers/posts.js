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
  const newPost = [action.id, action.post];
  return {
    ...state,
    error: null,
    posts: state.posts.concat([newPost]),
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
  };
};

const updatePostSuccess = (state, action) => {
  const idx = state.posts.findIndex(post => post[0] === action.id);
  const newPosts = state.posts.slice();
  newPosts[idx] = [action.id, action.post];
  console.log('newPosts', newPosts);
  return {
    ...state,
    posts: newPosts,
    error: null,
  };
};

const updatePostFail = (state, action) => {
  return {
    ...state,
    error: action.error,
  };
};

const deletePostRequest = (state) => {
  return {
    ...state,
    error: null,
  };
};

const deletePostSuccess = (state, action) => {
  // deleting from array post with id
  const newPosts = state.posts.filter((post) => post[0] !== action.id);
  return {
    ...state,
    posts: newPosts,
    error: null,
  };
};

const deletePostFail = (state, action) => {
  return {
    ...state,
    error: action.error,
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

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
    postUpdating: true,
  };
};

const addPostSuccess = (state, action) => {
  return {
    ...state,
    post: action.post,
    error: null,
    postUpdating: false,
  };
};

const addPostFail = (state, action) => {
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
    // case actionTypes.GET_POSTS_REQUEST:
    //   return getPostsRequest(state, action);
    // case actionTypes.GET_POSTS_SUCCESS:
    //   return getPostsSuccess(state, action);
    // case actionTypes.GET_POSTS_FAIL:
    //   return getPostsFail(state, action);
    // case actionTypes.UPDATE_POST_REQUEST:
    //   return updatePostRequest(state, action);
    // case actionTypes.UPDATE_POST_SUCCESS:
    //   return updatePostSuccess(state, action);
    // case actionTypes.UPDATE_POST_FAIL:
    //   return updatePostFail(state, action);
    // case actionTypes.DELETE_POST_REQUEST:
    //   return deletePostRequest(state, action);
    // case actionTypes.DELETE_POST_SUCCESS:
    //   return deletePostSuccess(state, action);
    // case actionTypes.DELETE_POST_FAIL:
    //   return deletePostFail(state, action);
    default:
      return state;
  }
};

export default postsReducer;
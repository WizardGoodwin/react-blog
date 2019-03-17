import * as actionTypes from '../actions/actionTypes';

const initialState = {
  comments: [],
  commentsError: null,
  commentsLoading: true,
};

const addCommentRequest = (state) => {
  return {
    ...state,
    commentsError: null,
  };
};

const addCommentSuccess = (state, action) => {
  const newComment = [action.id, action.comment];
  return {
    ...state,
    commentsError: null,
    comments: state.comments.concat([newComment]),
  };
};

const addCommentFail = (state, action) => {
  return {
    ...state,
    commentsError: action.error,
  };
};

const getCommentsRequest = (state) => {
  return {
    ...state,
    commentsError: null,
    commentsLoading: true,
  };
};

const getCommentsSuccess = (state, action) => {
  return {
    ...state,
    comments: action.comments,
    commentsError: null,
    commentsLoading: false,
  };
};

const getCommentsFail = (state, action) => {
  return {
    ...state,
    commentsError: action.error,
    commentsLoading: false,
  };
};

const getCommentsByPostIdRequest = (state) => {
  return {
    ...state,
    commentsError: null,
    commentsLoading: true,
  };
};

const getCommentsByPostIdSuccess = (state, action) => {
  return {
    ...state,
    comments: action.comments,
    commentsError: null,
    commentsLoading: false,
  };
};

const getCommentsByPostIdFail = (state, action) => {
  return {
    ...state,
    commentsError: action.error,
    commentsLoading: false,
  };
};

const incCounter = (state, action) => {
  const newComments = state.comments.map((comment) => {
    if (comment[0] === action.id) {
      comment[1] = action.comment;
    }
    return comment;
  });
  return {
    ...state,
    comments: newComments,
  };
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_COMMENT_REQUEST:
      return addCommentRequest(state, action);
    case actionTypes.ADD_COMMENT_SUCCESS:
      return addCommentSuccess(state, action);
    case actionTypes.ADD_COMMENT_FAIL:
      return addCommentFail(state, action);
    case actionTypes.GET_COMMENTS_REQUEST:
      return getCommentsRequest(state, action);
    case actionTypes.GET_COMMENTS_SUCCESS:
      return getCommentsSuccess(state, action);
    case actionTypes.GET_COMMENTS_FAIL:
      return getCommentsByPostIdFail(state, action);
    case actionTypes.GET_COMMENTS_BY_POST_ID_REQUEST:
      return getCommentsByPostIdRequest(state, action);
    case actionTypes.GET_COMMENTS_BY_POST_ID_SUCCESS:
      return getCommentsByPostIdSuccess(state, action);
    case actionTypes.GET_COMMENTS_BY_POST_ID_FAIL:
      return getCommentsFail(state, action);
    case actionTypes.INC_COUNTER:
      return incCounter(state, action);
    default:
      return state;
  }
};

export default commentsReducer;

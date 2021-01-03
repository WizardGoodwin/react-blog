import { CommentResponse } from '../../interfaces/api-responses';
import {
  CommentAction,
  IAddCommentFail,
  IAddCommentSuccess, IGetCommentsByPostIdFail,
  IGetCommentsByPostIdSuccess,
  IGetCommentsFail,
  IGetCommentsSuccess, IIncCounter,
} from '../actions/comments';
import { ActionTypes } from '../actions/actionTypes';

export interface ICommentState {
  list: CommentResponse[];
  commentsError: string | null;
  commentsLoading: boolean;
}

const initialState: ICommentState = {
  list: [],
  commentsError: null,
  commentsLoading: true,
};

const addCommentRequest = (state: ICommentState): ICommentState => {
  return {
    ...state,
    commentsError: null,
  };
};

const addCommentSuccess = (state: ICommentState, action: IAddCommentSuccess): ICommentState => {
  const newComment: CommentResponse = [action.id, action.comment];
  return {
    ...state,
    commentsError: null,
    list: state.list.concat([newComment]),
  };
};

const addCommentFail = (state: ICommentState, action: IAddCommentFail): ICommentState => {
  return {
    ...state,
    commentsError: action.error,
  };
};

const getCommentsRequest = (state: ICommentState): ICommentState => {
  return {
    ...state,
    commentsError: null,
    commentsLoading: true,
  };
};

const getCommentsSuccess = (state: ICommentState, action: IGetCommentsSuccess): ICommentState => {
  return {
    ...state,
    list: action.comments,
    commentsError: null,
    commentsLoading: false,
  };
};

const getCommentsFail = (state: ICommentState, action: IGetCommentsFail): ICommentState => {
  return {
    ...state,
    commentsError: action.error,
    commentsLoading: false,
  };
};

const getCommentsByPostIdRequest = (state: ICommentState): ICommentState => {
  return {
    ...state,
    commentsError: null,
    commentsLoading: true,
  };
};

const getCommentsByPostIdSuccess = (state: ICommentState, action: IGetCommentsByPostIdSuccess): ICommentState => {
  return {
    ...state,
    list: action.comments,
    commentsError: null,
    commentsLoading: false,
  };
};

const getCommentsByPostIdFail = (state: ICommentState, action: IGetCommentsByPostIdFail): ICommentState => {
  return {
    ...state,
    commentsError: action.error,
    commentsLoading: false,
  };
};

const incCounter = (state: ICommentState, action: IIncCounter): ICommentState => {
  const newComments: CommentResponse[] = state.list.map((comment: CommentResponse) => {
    if (comment[0] === action.id) {
      comment[1] = action.comment;
    }
    return comment;
  });
  return {
    ...state,
    list: newComments,
  };
};

const commentsReducer = (state: ICommentState = initialState, action: CommentAction) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT_REQUEST:
      return addCommentRequest(state);
    case ActionTypes.ADD_COMMENT_SUCCESS:
      return addCommentSuccess(state, action);
    case ActionTypes.ADD_COMMENT_FAIL:
      return addCommentFail(state, action);
    case ActionTypes.GET_COMMENTS_REQUEST:
      return getCommentsRequest(state);
    case ActionTypes.GET_COMMENTS_SUCCESS:
      return getCommentsSuccess(state, action);
    case ActionTypes.GET_COMMENTS_FAIL:
      return getCommentsFail(state, action);
    case ActionTypes.GET_COMMENTS_BY_POST_ID_REQUEST:
      return getCommentsByPostIdRequest(state);
    case ActionTypes.GET_COMMENTS_BY_POST_ID_SUCCESS:
      return getCommentsByPostIdSuccess(state, action);
    case ActionTypes.GET_COMMENTS_BY_POST_ID_FAIL:
      return getCommentsByPostIdFail(state, action);
    case ActionTypes.INC_COUNTER:
      return incCounter(state, action);
    default:
      return state;
  }
};

export default commentsReducer;

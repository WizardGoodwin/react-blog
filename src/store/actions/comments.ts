import axios from '../../axios';

import { ActionTypes } from './actionTypes';
import { IComment } from '../../interfaces/comment.interface';
import { CommentResponse } from '../../interfaces/api-responses';
import { AppThunkAction, AppThunkDispatch } from '../store';
import { getStorageItem } from '../../shared/helpers';

export interface IAddCommentRequest {
  type: ActionTypes.ADD_COMMENT_REQUEST
}

export interface IAddCommentSuccess {
  type: ActionTypes.ADD_COMMENT_SUCCESS;
  id: string;
  comment: IComment;
}

export interface IAddCommentFail {
  type: ActionTypes.ADD_COMMENT_FAIL;
  error: string;
}

export interface IGetCommentsRequest {
  type: ActionTypes.GET_COMMENTS_REQUEST
}

export interface IGetCommentsSuccess {
  type: ActionTypes.GET_COMMENTS_SUCCESS;
  comments: CommentResponse[];
}

export interface IGetCommentsFail {
  type: ActionTypes.GET_COMMENTS_FAIL;
  error: string;
}

export interface IGetCommentsByPostIdRequest {
  type: ActionTypes.GET_COMMENTS_BY_POST_ID_REQUEST
}

export interface IGetCommentsByPostIdSuccess {
  type: ActionTypes.GET_COMMENTS_BY_POST_ID_SUCCESS;
  comments: CommentResponse[];
}

export interface IGetCommentsByPostIdFail {
  type: ActionTypes.GET_COMMENTS_BY_POST_ID_FAIL;
  error: string;
}

export interface IIncCounter {
  type: ActionTypes.INC_COUNTER;
  id: string;
  comment: IComment;
}

const addCommentRequest = (): IAddCommentRequest => {
  return {
    type: ActionTypes.ADD_COMMENT_REQUEST,
  };
};

const addCommentSuccess = (id: string, comment: IComment): IAddCommentSuccess => {
  return {
    type: ActionTypes.ADD_COMMENT_SUCCESS,
    id,
    comment,
  };
};

const addCommentFail = (error: string): IAddCommentFail => {
  return {
    type: ActionTypes.ADD_COMMENT_FAIL,
    error: error,
  };
};

const getCommentsRequest = (): IGetCommentsRequest => {
  return {
    type: ActionTypes.GET_COMMENTS_REQUEST,
  };
};

const getCommentsSuccess = (comments: CommentResponse[]): IGetCommentsSuccess => {
  return {
    type: ActionTypes.GET_COMMENTS_SUCCESS,
    comments: comments,
  };
};

const getCommentsFail = (error: string): IGetCommentsFail => {
  return {
    type: ActionTypes.GET_COMMENTS_FAIL,
    error: error,
  };
};

const getCommentsByPostIdRequest = (): IGetCommentsByPostIdRequest => {
  return {
    type: ActionTypes.GET_COMMENTS_BY_POST_ID_REQUEST,
  };
};

const getCommentsByPostIdSuccess = (comments: CommentResponse[]): IGetCommentsByPostIdSuccess => {
  return {
    type: ActionTypes.GET_COMMENTS_BY_POST_ID_SUCCESS,
    comments: comments,
  };
};

const getCommentsByPostIdFail = (error: string): IGetCommentsByPostIdFail => {
  return {
    type: ActionTypes.GET_COMMENTS_BY_POST_ID_FAIL,
    error: error,
  };
};

const incCounter = (id: string, comment: IComment): IIncCounter => {
  return {
    type: ActionTypes.INC_COUNTER,
    id,
    comment,
  };
};

export const addComment = (token: string, newComment: IComment): AppThunkAction<CommentAction> => {
  // taking author from local storage an adding it to comment object
  const author = getStorageItem('username');
  const comment = { ...newComment, author };
  return async (dispatch: AppThunkDispatch<CommentAction>) => {
    dispatch(addCommentRequest());
    try {
      const response = await axios.post(`/comments.json?auth=${token}`, comment);
      const id = response.data.name;
      dispatch(addCommentSuccess(id, comment));
    } catch (err) {
      dispatch(addCommentFail(err.response.data.error));
    }
  };
};

export const getCommentsByPostId = (postId: string): AppThunkAction<CommentAction> => {
  return async (dispatch: AppThunkDispatch<CommentAction>) => {
    dispatch(getCommentsByPostIdRequest());
    try {
      const response = await axios.get(`/comments.json`);
      //convert response object to array of arrays kind of [ id : comment ]
      const allComments: CommentResponse[] = Object.entries(response.data);
      // and finding only those comments which have needed post id
      const comments: CommentResponse[] = allComments.filter(
        (comment: CommentResponse) => comment[1].postId === postId,
      );
      dispatch(getCommentsByPostIdSuccess(comments));
    } catch(err) {
      dispatch(getCommentsByPostIdFail(err.response.data.error));
    }
  };
};

export const getComments = (): AppThunkAction<CommentAction> => {
  return async (dispatch: AppThunkDispatch<CommentAction>) => {
    dispatch(getCommentsRequest());
    try {
      const response = await axios.get(`/comments.json`);
      //convert response object to array of arrays kind of [ id : comment ]
      const comments: CommentResponse[] = Object.entries(response.data);
      dispatch(getCommentsSuccess(comments));
    } catch (err) {
      dispatch(getCommentsFail(err.response.data.error));
    }
  };
};

export const incLikeCounter = (id: string, comment: IComment): AppThunkAction<CommentAction> => {
  comment.likeCounter++;
  return async (dispatch: AppThunkDispatch<CommentAction>) => {
    dispatch(incCounter(id, comment));
    axios.put(`/comments/${id}.json`, comment);
  };
};

export const incDislikeCounter = (id: string, comment: IComment): AppThunkAction<CommentAction> => {
  comment.dislikeCounter++;
  return async (dispatch: AppThunkDispatch<CommentAction>) => {
    dispatch(incCounter(id, comment));
    axios.put(`/comments/${id}.json`, comment);
  };
};

export type CommentAction = IAddCommentRequest | IAddCommentSuccess | IAddCommentFail | IGetCommentsRequest |
  IGetCommentsSuccess | IGetCommentsFail | IGetCommentsByPostIdRequest | IGetCommentsByPostIdSuccess |
  IGetCommentsByPostIdFail | IIncCounter;

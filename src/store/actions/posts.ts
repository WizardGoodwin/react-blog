import axios from '../../axios';
import { ActionTypes } from './actionTypes';
import { IPost } from '../../interfaces/post.interface';
import { IError, PostResponse } from '../../interfaces/api-responses';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export interface IAddPostRequest {
  type: ActionTypes.ADD_POST_REQUEST
}

export interface IAddPostSuccess {
  type: ActionTypes.ADD_POST_SUCCESS;
  id: string;
  post: IPost;
}

export interface IAddPostFail {
  type: ActionTypes.ADD_POST_FAIL;
  error: string;
}

export interface IGetPostsRequest {
  type: ActionTypes.GET_POSTS_REQUEST
}

export interface IGetPostsSuccess {
  type: ActionTypes.GET_POSTS_SUCCESS;
  posts: PostResponse[];
}

export interface IGetPostsFail {
  type: ActionTypes.GET_POSTS_FAIL;
  error: string;
}

export interface IGetLastPostsRequest {
  type: ActionTypes.GET_LAST_POSTS_REQUEST
}

export interface IGetLastPostsSuccess {
  type: ActionTypes.GET_LAST_POSTS_SUCCESS;
  posts: PostResponse[];
}

export interface IGetLastPostsFail {
  type: ActionTypes.GET_LAST_POSTS_FAIL;
  error: string;
}

export interface IUpdatePostRequest {
  type: ActionTypes.UPDATE_POST_REQUEST
}

export interface IUpdatePostSuccess {
  type: ActionTypes.UPDATE_POST_SUCCESS;
  id: string;
  post: IPost;
}

export interface IUpdatePostFail {
  type: ActionTypes.UPDATE_POST_FAIL;
  error: string;
}

export interface IDeletePostRequest {
  type: ActionTypes.DELETE_POST_REQUEST
}

export interface IDeletePostSuccess {
  type: ActionTypes.DELETE_POST_SUCCESS;
  id: string;
}

export interface IDeletePostFail {
  type: ActionTypes.DELETE_POST_FAIL;
  error: string;
}

const addPostRequest = (): IAddPostRequest => {
  return {
    type: ActionTypes.ADD_POST_REQUEST,
  };
};

const addPostSuccess = (id: string, post: IPost): IAddPostSuccess => {
  return {
    type: ActionTypes.ADD_POST_SUCCESS,
    id,
    post,
  };
};

const addPostFail = (error: string): IAddPostFail => {
  return {
    type: ActionTypes.ADD_POST_FAIL,
    error,
  };
};

const getPostsRequest = (): IGetPostsRequest => {
  return {
    type: ActionTypes.GET_POSTS_REQUEST,
  };
};

const getPostsSuccess = (posts: PostResponse[]): IGetPostsSuccess => {
  return {
    type: ActionTypes.GET_POSTS_SUCCESS,
    posts,
  };
};

const getPostsFail = (error: string): IGetPostsFail => {
  return {
    type: ActionTypes.GET_POSTS_FAIL,
    error,
  };
};

const getLastPostsRequest = (): IGetLastPostsRequest => {
  return {
    type: ActionTypes.GET_LAST_POSTS_REQUEST,
  };
};

const getLastPostsSuccess = (posts: PostResponse[]): IGetLastPostsSuccess => {
  return {
    type: ActionTypes.GET_LAST_POSTS_SUCCESS,
    posts,
  };
};

const getLastPostsFail = (error: string): IGetLastPostsFail => {
  return {
    type: ActionTypes.GET_LAST_POSTS_FAIL,
    error,
  };
};

const updatePostRequest = (): IUpdatePostRequest => {
  return {
    type: ActionTypes.UPDATE_POST_REQUEST,
  };
};

const updatePostSuccess = (id: string, post: IPost): IUpdatePostSuccess => {
  return {
    type: ActionTypes.UPDATE_POST_SUCCESS,
    id,
    post,
  };
};

const updatePostFail = (error: string): IUpdatePostFail => {
  return {
    type: ActionTypes.UPDATE_POST_FAIL,
    error,
  };
};

const deletePostRequest = (): IDeletePostRequest => {
  return {
    type: ActionTypes.DELETE_POST_REQUEST,
  };
};

const deletePostSuccess = (id: string): IDeletePostSuccess => {
  return {
    type: ActionTypes.DELETE_POST_SUCCESS,
    id,
  };
};

const deletePostFail = (error: string): IDeletePostFail => {
  return {
    type: ActionTypes.DELETE_POST_FAIL,
    error,
  };
};

export const addPost = (token: string, newPost: IPost): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  // time and date of creating post
  const date = new Date().toLocaleString();
  // getting author from local storage
  const author = localStorage.getItem('username');
  const post = { ...newPost, created_at: date, author };
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(addPostRequest());
    axios
      .post(`/posts.json?auth=${token}`, post)
      .then((response) => {
        const id = response.data.name;
        dispatch(addPostSuccess(id, post));
      })
      .catch((err: IError) => {
        dispatch(addPostFail(err.response.data.error));
      });
  };
};

export const getPosts = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getPostsRequest());
    axios
      .get(`/posts.json`)
      .then((response) => {
        //convert response object to array of arrays kind of [ id : post ]
        const posts: any[] = Object.entries(response.data);
        dispatch(getPostsSuccess(posts));
      })
      .catch((err: IError) => {
        dispatch(getPostsFail(err.response.data.error));
      });
  };
};

export const getLastPosts = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getLastPostsRequest());
    axios
      .get(`/posts.json`)
      .then((response) => {
        //convert response object to array of arrays kind of [ id : post ]
        const posts: any[] = Object.entries(response.data).slice(-5);
        dispatch(getLastPostsSuccess(posts));
      })
      .catch((err: IError) => {
        dispatch(getLastPostsFail(err.response.data.error));
      });
  };
};

export const updatePost = (token: string, id: string, editedPost: IPost): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  // time and date of updating post
  const date = new Date().toLocaleString();
  const post = { ...editedPost, created_at: date };
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(updatePostRequest());
    axios
      .put(`/posts/${id}.json?auth=${token}`, post)
      .then(() => {
        dispatch(updatePostSuccess(id, post));
      })
      .catch((err: IError) => {
        dispatch(updatePostFail(err.response.data.error));
      });
  };
};

export const deletePost = (token: string, id: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(deletePostRequest());
    axios
      .delete(`/posts/${id}.json?auth=${token}`)
      .then(() => {
        dispatch(deletePostSuccess(id));
      })
      .catch((err: IError) => {
        dispatch(deletePostFail(err.response.data.error));
      });
  };
};

export type PostAction = IAddPostRequest | IAddPostSuccess | IAddPostFail | IGetPostsRequest | IGetPostsSuccess |
  IGetPostsFail | IGetLastPostsRequest | IGetLastPostsSuccess | IGetLastPostsFail | IUpdatePostRequest |
  IUpdatePostSuccess | IUpdatePostFail | IDeletePostRequest | IDeletePostSuccess | IDeletePostFail;

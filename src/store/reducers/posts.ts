import { ActionTypes } from '../actions/actionTypes';
import { PostResponse } from '../../interfaces/api-responses';
import { IPost } from '../../interfaces/post.interface';
import {
  IAddPostFail,
  IAddPostSuccess, IDeletePostFail, IDeletePostSuccess,
  IGetLastPostsFail,
  IGetLastPostsSuccess,
  IGetPostsFail,
  IGetPostsSuccess, IUpdatePostFail, IUpdatePostSuccess, PostAction,
} from '../actions/posts';

export interface IPostState {
  list: PostResponse[];
  post: IPost;
  postsError: string | null;
  postLoading: boolean;
  postUpdating: boolean;
  postsLoading: boolean;
}

const initialState: IPostState = {
  list: [],
  post: {
    author: '',
    title: '',
    body: '',
    created_at: ''
  },
  postsError: null,
  postLoading: true,
  postUpdating: false,
  postsLoading: true,
};

const addPostRequest = (state: IPostState): IPostState => {
  return {
    ...state,
    postsError: null,
  };
};

const addPostSuccess = (state: IPostState, action: IAddPostSuccess): IPostState => {
  const newPost: PostResponse = [action.id, action.post];
  return {
    ...state,
    postsError: null,
    list: state.list.concat([newPost]),
  };
};

const addPostFail = (state: IPostState, action: IAddPostFail): IPostState => {
  return {
    ...state,
    postsError: action.error,
  };
};

const getPostsRequest = (state: IPostState): IPostState => {
  return {
    ...state,
    postsError: null,
    postsLoading: true,
  };
};

const getPostsSuccess = (state: IPostState, action: IGetPostsSuccess): IPostState => {
  return {
    ...state,
    list: action.posts,
    postsError: null,
    postsLoading: false,
  };
};

const getPostsFail = (state: IPostState, action: IGetPostsFail): IPostState => {
  return {
    ...state,
    postsError: action.error,
    postsLoading: false,
  };
};

const getLastPostsRequest = (state: IPostState): IPostState => {
  return {
    ...state,
    postsError: null,
    postsLoading: true,
  };
};

const getLastPostsSuccess = (state: IPostState, action: IGetLastPostsSuccess): IPostState => {
  return {
    ...state,
    list: action.posts,
    postsError: null,
    postsLoading: false,
  };
};

const getLastPostsFail = (state: IPostState, action: IGetLastPostsFail): IPostState => {
  return {
    ...state,
    postsError: action.error,
    postsLoading: false,
  };
};

const updatePostRequest = (state: IPostState): IPostState => {
  return {
    ...state,
    postsError: null,
  };
};

const updatePostSuccess = (state: IPostState, action: IUpdatePostSuccess): IPostState => {
  // finding index of updating post in the array of posts
  const idx = state.list.findIndex((post) => post[0] === action.id);
  // creating copy of array
  const newPosts: PostResponse[] = state.list.slice();
  // changing updated post in the array
  newPosts[idx] = [action.id, action.post];
  return {
    ...state,
    list: newPosts,
    postsError: null,
  };
};

const updatePostFail = (state: IPostState, action: IUpdatePostFail): IPostState => {
  return {
    ...state,
    postsError: action.error,
  };
};

const deletePostRequest = (state: IPostState): IPostState => {
  return {
    ...state,
    postsError: null,
  };
};

const deletePostSuccess = (state: IPostState, action: IDeletePostSuccess): IPostState => {
  // deleting from array post with id
  const newPosts: PostResponse[] = state.list.filter((post) => post[0] !== action.id);
  return {
    ...state,
    list: newPosts,
    postsError: null,
  };
};

const deletePostFail = (state: IPostState, action: IDeletePostFail): IPostState => {
  return {
    ...state,
    postsError: action.error,
  };
};

const postsReducer = (state: IPostState = initialState, action: PostAction) => {
  switch (action.type) {
    case ActionTypes.ADD_POST_REQUEST:
      return addPostRequest(state);
    case ActionTypes.ADD_POST_SUCCESS:
      return addPostSuccess(state, action);
    case ActionTypes.ADD_POST_FAIL:
      return addPostFail(state, action);
    case ActionTypes.GET_POSTS_REQUEST:
      return getPostsRequest(state);
    case ActionTypes.GET_POSTS_SUCCESS:
      return getPostsSuccess(state, action);
    case ActionTypes.GET_POSTS_FAIL:
      return getPostsFail(state, action);
    case ActionTypes.GET_LAST_POSTS_REQUEST:
      return getLastPostsRequest(state);
    case ActionTypes.GET_LAST_POSTS_SUCCESS:
      return getLastPostsSuccess(state, action);
    case ActionTypes.GET_LAST_POSTS_FAIL:
      return getLastPostsFail(state, action);
    case ActionTypes.UPDATE_POST_REQUEST:
      return updatePostRequest(state);
    case ActionTypes.UPDATE_POST_SUCCESS:
      return updatePostSuccess(state, action);
    case ActionTypes.UPDATE_POST_FAIL:
      return updatePostFail(state, action);
    case ActionTypes.DELETE_POST_REQUEST:
      return deletePostRequest(state);
    case ActionTypes.DELETE_POST_SUCCESS:
      return deletePostSuccess(state, action);
    case ActionTypes.DELETE_POST_FAIL:
      return deletePostFail(state, action);
    default:
      return state;
  }
};

export default postsReducer;

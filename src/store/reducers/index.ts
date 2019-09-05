import { combineReducers } from 'redux';

import authReducer, { IAuthState } from './auth';
import usersReducer, { IUserState } from './users';
import postsReducer, { IPostState } from './posts';
import commentsReducer, { ICommentState } from './comments';

export interface IState {
  auth: IAuthState;
  users: IUserState;
  posts: IPostState;
  comments: ICommentState;
}

export const rootReducer = combineReducers<IState>({
  auth: authReducer,
  users: usersReducer,
  posts: postsReducer,
  comments: commentsReducer,
});

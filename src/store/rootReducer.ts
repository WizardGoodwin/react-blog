import { combineReducers } from 'redux';

import authReducer, { IAuthState } from '../features/auth/authSlice';
import usersReducer, { IUserState } from '../features/users/usersSlice';
import postsReducer, { IPostState } from '../features/posts/postsSlice';
import commentsReducer, { ICommentState } from '../features/comments/commentsSlice';

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

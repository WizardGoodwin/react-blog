import { combineReducers } from 'redux';

import authReducer from './auth';
import usersReducer from './users';
import postsReducer from './posts';
import commentsReducer from './comments';

export const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  posts: postsReducer,
  comments: commentsReducer,
});

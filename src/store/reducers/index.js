import { combineReducers } from 'redux';
import authReducer from './auth';
import usersReducer from './users';

export const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
});

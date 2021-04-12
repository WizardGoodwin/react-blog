import { all } from 'redux-saga/effects';

import { authSaga } from '../features/auth/authSlice';
import { usersSaga } from '../features/users/usersSlice';
import { postsSaga } from '../features/posts/postsSlice';
import { commentsSaga } from '../features/comments/commentsSlice';


export function* rootSaga() {
  yield all([
    authSaga(),
    usersSaga(),
    postsSaga(),
    commentsSaga()
  ])
}

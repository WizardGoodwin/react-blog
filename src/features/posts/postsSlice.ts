import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import * as api from '../../api';
import { PostResponse } from '../../interfaces/api-responses';
import { getStorageItem } from '../../shared/helpers';
import { IPost } from '../../interfaces/post.interface';

export interface IPostState {
  list: PostResponse[];
  post: IPost;
  error: string | null;
  loading: boolean;
  updating: boolean;
  updated: boolean;
  deleting: boolean;
}

const initialState: IPostState = {
  list: [],
  post: {
    author: '',
    title: '',
    body: '',
    created_at: ''
  },
  error: null,
  loading: false,
  updating: false,
  updated: false,
  deleting: false,
};

const startLoading = (state: IPostState) => {
  state.loading = true;
}

const loadingFailed = (state: IPostState, action: PayloadAction<string>) => {
  state.loading = false;
  state.error = action.payload;
}

const startUpdating = (state: IPostState) => {
  state.updating = true;
  state.updated = false;
}

const updatingFailed = (state: IPostState, action: PayloadAction<string>) => {
  state.updating = false;
  state.updated = true;
  state.error = action.payload;
}

const startDeleting = (state: IPostState) => {
  state.deleting = true;
}

const deletingFailed = (state: IPostState, action: PayloadAction<string>) => {
  state.deleting = false;
  state.error = action.payload;
}

const posts = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    getPosts: startLoading,
    addPost: startUpdating,
    updatePost: startUpdating,
    deletePost: startDeleting,
    getPostsSuccess(state, { payload }: PayloadAction<PostResponse[]>) {
      state.list = payload;
      state.loading = false;
      state.error = null;
    },
    addPostSuccess(state, { payload }: PayloadAction<{ id: string, post: IPost }>) {
      const newPost: PostResponse = [payload.id, payload.post];
      state.list.push(newPost);
      state.updating = false;
      state.updated = true;
      state.error = null;
    },
    updatePostSuccess(state, { payload }: PayloadAction<{ id: string, post: IPost }>) {
      const index = state.list.findIndex((post) => post[0] === payload.id);
      if (index > -1) {
        state.list[index] = [payload.id, payload.post];
      }
      state.updating = false;
      state.updated = true;
      state.error = null;
    },
    deletePostSuccess(state, { payload }: PayloadAction<string>) {
      const index = state.list.findIndex((post) => post[0] === payload);
      if (index > -1) {
        state.list.splice(index, 1);
      }
      state.deleting = false;
      state.error = null;
    },
    getPostsFailure: loadingFailed,
    addPostFailure: updatingFailed,
    updatePostFailure: updatingFailed,
    deletePostFailure: deletingFailed
  }
})

export const {
  getPosts,
  getPostsSuccess,
  addPostSuccess,
  updatePostSuccess,
  deletePostSuccess,
  getPostsFailure,
  addPostFailure,
  updatePostFailure,
  deletePostFailure
} = posts.actions;

export const addPost = createAction<{ token: string | null, newPost: IPost }>('posts/addPost');

export const updatePost = createAction<{ token: string | null, id: string, editedPost: IPost }>('posts/updatePost');

export const deletePost = createAction<{ token: string | null, id: string }>('posts/deletePost');

export default posts.reducer;

function* getPostsSaga() {
  try {
    const response = yield call(api.getUsers);
    //convert response object to array of arrays kind of [ id : post ]
    const posts: PostResponse[] = Object.entries(response.data);
    yield put(getPostsSuccess(posts))
  } catch (err) {
    yield put(getPostsFailure(err.response.data.error))
  }
}

function* addPostSaga({ payload }: PayloadAction<{ token: string, newPost: IPost }>) {
  try {
    const { newPost, token } = payload;
    // time and date of creating post
    const date = new Date().toLocaleString();
    // getting author from local storage
    const author = getStorageItem('username');
    const post = { ...newPost, created_at: date, author };
    const response = yield call(api.addUser, token, post);
    const id = response.data.name;
    yield put(addPostSuccess({ id, post }))
  } catch (err) {
    yield put(addPostFailure(err.response.data.error))
  }
}

function* updatePostSaga({ payload }: PayloadAction<{ token: string | null, id: string, editedPost: IPost }>) {
  const { token, id, editedPost } = payload;
  try {
    // time and date of updating post
    const date = new Date().toLocaleString();
    const post = { ...editedPost, created_at: date };
    yield call(api.updateUser, token, id, post);
    yield put(updatePostSuccess({ id, post }))
  } catch (err) {
    yield put(updatePostFailure(err.response.data.error))
  }
}

function* deletePostSaga({ payload }: PayloadAction<{ token: string | null, id: string, editedPost: IPost }>) {
  const { token, id } = payload;
  try {
    yield call(api.deleteUser, token, id);
    yield put(deletePostSuccess(id))
  } catch (err) {
    yield put(deletePostFailure(err.response.data.error))
  }
}

export function* postsSaga() {
  yield takeLatest(getPosts, getPostsSaga);
  yield takeEvery(addPost, addPostSaga);
  yield takeEvery(updatePost, updatePostSaga);
  yield takeEvery(deletePost, deletePostSaga);
}

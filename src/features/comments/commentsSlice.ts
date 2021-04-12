import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { CommentResponse } from '../../interfaces/api-responses';
import { IComment } from '../../interfaces/comment.interface';
import { getStorageItem } from '../../shared/helpers';
import * as api from '../../api';



export interface ICommentState {
  list: CommentResponse[];
  error: string | null;
  loading: boolean;
  adding: boolean;
}

const initialState: ICommentState = {
  list: [],
  error: null,
  loading: false,
  adding: false,
};

const startLoading = (state: ICommentState) => {
  state.loading = true
}

const loadingFailed = (state: ICommentState, action: PayloadAction<string>) => {
  state.loading = false
  state.error = action.payload
}

const startAdding = (state: ICommentState) => {
  state.adding = true
}

const addingFailed = (state: ICommentState, action: PayloadAction<string>) => {
  state.adding = false
  state.error = action.payload
}

const comments = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {
    incLikeCounterSuccess(state, { payload }: PayloadAction<string>) {
      const id = state.list.findIndex((comment: CommentResponse) => comment[0] === payload);
      if (id) {
        state.list[id][1].likeCounter++;
      }
    },
    incDislikeCounterSuccess(state, { payload }: PayloadAction<string>) {
      const index = state.list.findIndex((comment: CommentResponse) => comment[0] === payload);
      if (index) {
        state.list[index][1].dislikeCounter++;
      }
    },
    getComments: startLoading,
    addComment: startAdding,
    getCommentsSuccess(state, { payload }: PayloadAction<CommentResponse[]>) {
      state.list = payload;
      state.loading = false;
      state.error = null;
    },
    addCommentSuccess(state, { payload }: PayloadAction<{ id: string, comment: IComment }>) {
      const newComment: CommentResponse = [payload.id, payload.comment];
      state.list.push(newComment);
      state.adding = false;
      state.error = null;
    },
    getCommentsFailure: loadingFailed,
    addCommentFailure: addingFailed
  }
})

export const {
  getComments,
  getCommentsSuccess,
  addCommentSuccess,
  incLikeCounterSuccess,
  incDislikeCounterSuccess,
  getCommentsFailure,
  addCommentFailure
} = comments.actions;

export const addComment = createAction<{ token: string | null, newComment: IComment }>('comments/addComment');

export const incLikeCounter = createAction<{ id: string, comment: IComment }>('comments/incLikeCounter');

export const incDislikeCounter = createAction<{ id: string, comment: IComment }>('comments/incDislikeCounter');

export default comments.reducer;


function* getCommentsSaga() {
  try {
    const response = yield call(api.getComments);
    //convert response object to array of arrays kind of [ id : comment ]
    const comments: CommentResponse[] = Object.entries(response.data);
    yield put(getCommentsSuccess(comments))
  } catch (err) {
    yield put(getCommentsFailure(err.response.data.error))
  }
}

function* addCommentSaga({ payload }: PayloadAction<{ token: string, newComment: IComment }>) {
  try {
    const { newComment, token } = payload;
    // taking author from local storage an adding it to comment object
    const author = getStorageItem('username');
    const comment = { ...newComment, author };
    const response = yield call(api.addComment, token, comment);
    const id = response.data.name;
    yield put(addCommentSuccess({ id, comment }))
  } catch (err) {
    yield put(addCommentFailure(err.response.data.error))
  }
}

function* incrementLikeCounter({ payload }: PayloadAction<{ id: string, comment: IComment }>) {
  const { comment, id } = payload;
  yield put(incLikeCounterSuccess(id));
  yield call(api.updateComment, id, comment);
}

function* incrementDislikeCounter({ payload }: PayloadAction<{ id: string, comment: IComment }>) {
  const { comment, id } = payload;
  yield put(incDislikeCounterSuccess(id));
  yield call(api.updateComment, id, comment);
}

export function* commentsSaga() {
  yield takeLatest(getComments, getCommentsSaga);
  yield takeEvery(addComment, addCommentSaga);
  yield takeEvery(incLikeCounter, incrementLikeCounter);
  yield takeEvery(incDislikeCounter, incrementDislikeCounter);
}

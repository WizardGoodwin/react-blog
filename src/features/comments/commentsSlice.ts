import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../axios';

import { CommentResponse } from '../../interfaces/api-responses';
import { IComment } from '../../interfaces/comment.interface';
import { AppThunk, AppThunkDispatch } from '../../store/store';
import { getStorageItem } from '../../shared/helpers';

export interface ICommentState {
  list: CommentResponse[];
  error: string | null;
  loading: boolean;
}

const initialState: ICommentState = {
  list: [],
  error: null,
  loading: false,
};

const startLoading = (state: ICommentState) => {
  state.loading = true
}

const loadingFailed = (state: ICommentState, action: PayloadAction<string>) => {
  state.loading = false
  state.error = action.payload
}

const comments = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {
    incLikeCounter(state, { payload }: PayloadAction<string>) {
      const id = state.list.findIndex((comment: CommentResponse) => comment[0] === payload);
      if (id) {
        state.list[id][1].likeCounter++;
      }
    },
    incDislikeCounter(state, { payload }: PayloadAction<string>) {
      const index = state.list.findIndex((comment: CommentResponse) => comment[0] === payload);
      if (index) {
        state.list[index][1].dislikeCounter++;
      }
    },
    getCommentsStart: startLoading,
    getCommentsByPostIdStart: startLoading,
    addCommentStart: startLoading,
    getCommentsSuccess(state, { payload }: PayloadAction<CommentResponse[]>) {
      state.list = payload;
      state.loading = false;
      state.error = null;
    },
    getCommentsByPostIdSuccess(state, { payload }: PayloadAction<CommentResponse[]>) {
      state.list = payload;
      state.loading = false;
      state.error = null;
    },
    addCommentSuccess(state, { payload }: PayloadAction<{ id: string, comment: IComment }>) {
      const newComment: CommentResponse = [payload.id, payload.comment];
      state.list.push(newComment);
      state.loading = false;
      state.error = null;
    },
    getCommentsFailure: loadingFailed,
    getCommentsByPostIdFailure: loadingFailed,
    addCommentFailure: loadingFailed
  }
})

export const {
  incLikeCounter,
  incDislikeCounter,
  getCommentsStart,
  getCommentsByPostIdStart,
  addCommentStart,
  getCommentsSuccess,
  getCommentsByPostIdSuccess,
  addCommentSuccess,
  getCommentsFailure,
  getCommentsByPostIdFailure,
  addCommentFailure
} = comments.actions;

export default comments.reducer;

export const getComments = (): AppThunk => async (dispatch: AppThunkDispatch) => {
  try {
    dispatch(getCommentsStart());
    const response = await axios.get(`/comments.json`);
    //convert response object to array of arrays kind of [ id : comment ]
    const comments: CommentResponse[] = Object.entries(response.data);
    dispatch(getCommentsSuccess(comments));
  } catch (err) {
    dispatch(getCommentsFailure(err.response.data.error));
  }
}

export const getCommentsByPostId = (postId: string): AppThunk => {
  return async (dispatch: AppThunkDispatch) => {
    try {
      dispatch(getCommentsByPostIdStart());
      const response = await axios.get(`/comments.json`);
      //convert response object to array of arrays kind of [ id : comment ]
      const allComments: CommentResponse[] = Object.entries(response.data);
      // and finding only those comments which have needed post id
      const comments: CommentResponse[] = allComments.filter(
        (comment: CommentResponse) => comment[1].postId === postId,
      );
      dispatch(getCommentsByPostIdSuccess(comments));
    } catch(err) {
      dispatch(getCommentsByPostIdFailure(err.response.data.error));
    }
  };
};

export const addComment = (token: string | null, newComment: IComment): AppThunk => {
  // taking author from local storage an adding it to comment object
  const author = getStorageItem('username');
  const comment = { ...newComment, author };
  return async (dispatch: AppThunkDispatch) => {
    try {
      dispatch(addCommentStart());
      const response = await axios.post(`/comments.json?auth=${token}`, comment);
      const id = response.data.name;
      dispatch(addCommentSuccess({id, comment}));
    } catch (err) {
      dispatch(addCommentFailure(err.response.data.error));
    }
  };
};

export const incrementLikeCounter = (id: string, comment: IComment): AppThunk => {
  return (dispatch: AppThunkDispatch) => {
    dispatch(incLikeCounter(id));
    axios.put(`/comments/${id}.json`, comment);
  };
};

export const incrementDislikeCounter = (id: string, comment: IComment): AppThunk => {
  return (dispatch: AppThunkDispatch) => {
    dispatch(incDislikeCounter(id));
    axios.put(`/comments/${id}.json`, comment);
  };
};

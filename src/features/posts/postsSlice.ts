import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../axios';

import { PostResponse } from '../../interfaces/api-responses';
import { AppThunk, AppThunkDispatch } from '../../store/store';
import { getStorageItem } from '../../shared/helpers';
import { IPost } from '../../interfaces/post.interface';

export interface IPostState {
  list: PostResponse[];
  post: IPost;
  error: string | null;
  loading: boolean;
  updating: boolean;
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
};

const startLoading = (state: IPostState) => {
  state.loading = true
}

const loadingFailed = (state: IPostState, action: PayloadAction<string>) => {
  state.loading = false
  state.error = action.payload
}

const startUpdating = (state: IPostState) => {
  state.updating = true
}

const updatingFailed = (state: IPostState, action: PayloadAction<string>) => {
  state.updating = false
  state.error = action.payload
}

const posts = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    getPostsStart: startLoading,
    addPostStart: startLoading,
    updatePostStart: startUpdating,
    deletePostStart: startLoading,
    getPostsSuccess(state, { payload }: PayloadAction<PostResponse[]>) {
      state.list = payload;
      state.loading = false;
      state.error = null;
    },
    addPostSuccess(state, { payload }: PayloadAction<{ id: string, post: IPost }>) {
      const newPost: PostResponse = [payload.id, payload.post];
      state.list.push(newPost);
      state.loading = false;
      state.error = null;
    },
    updatePostSuccess(state, { payload }: PayloadAction<{ id: string, post: IPost }>) {
      const index = state.list.findIndex((post) => post[0] === payload.id);
      if (index > -1) {
        state.list[index] = [payload.id, payload.post];
      }
      state.loading = false;
      state.error = null;
    },
    deletePostSuccess(state, { payload }: PayloadAction<string>) {
      const index = state.list.findIndex((post) => post[0] === payload);
      if (index > -1) {
        state.list.splice(index, 1);
      }
      state.loading = false;
      state.error = null;
    },
    getPostsFailure: loadingFailed,
    addPostFailure: loadingFailed,
    updatePostFailure: updatingFailed,
    deletePostFailure: loadingFailed
  }
})

export const {
  getPostsStart,
  addPostStart,
  updatePostStart,
  deletePostStart,
  getPostsSuccess,
  addPostSuccess,
  updatePostSuccess,
  deletePostSuccess,
  getPostsFailure,
  addPostFailure,
  updatePostFailure,
  deletePostFailure
} = posts.actions;

export default posts.reducer;

export const getPosts = (): AppThunk => async (dispatch: AppThunkDispatch) => {
  try {
    dispatch(getPostsStart());
    const response = await axios.get(`/posts.json`);
    //convert response object to array of arrays kind of [ id : post ]
    const posts: PostResponse[] = Object.entries(response.data);
    dispatch(getPostsSuccess(posts));
  } catch (err) {
    dispatch(getPostsFailure(err.response.data.error));
  }
}

export const addPost = (token: string | null, newPost: IPost): AppThunk => {
  // time and date of creating post
  const date = new Date().toLocaleString();
  // getting author from local storage
  const author = getStorageItem('username');
  const post = { ...newPost, created_at: date, author };
  return async (dispatch: AppThunkDispatch) => {
    try {
      dispatch(addPostStart());
      const response = await axios.post(`/posts.json?auth=${token}`, post)
      const id = response.data.name;
      dispatch(addPostSuccess({ id, post }));
    } catch (err) {
      dispatch(addPostFailure(err.response.data.error));
    }
  };
};

export const updatePost = (token: string | null, id: string, editedPost: IPost): AppThunk => {
  // time and date of updating post
  const date = new Date().toLocaleString();
  const post = { ...editedPost, created_at: date };
  return async (dispatch: AppThunkDispatch) => {
    try {
      dispatch(updatePostStart());
      await axios.put(`/posts/${id}.json?auth=${token}`, post)
      dispatch(updatePostSuccess({ id, post }));
    } catch (err) {
      dispatch(updatePostFailure(err.response.data.error));
    }
  };
};

export const deletePost = (token: string | null, id: string): AppThunk => {
  return async (dispatch: AppThunkDispatch) => {
    try {
      dispatch(deletePostStart());
      await axios.delete(`/posts/${id}.json?auth=${token}`);
      dispatch(deletePostSuccess(id));
    } catch (err) {
      dispatch(deletePostFailure(err.response.data.error));
    }
  };
};


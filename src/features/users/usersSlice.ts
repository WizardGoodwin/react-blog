import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../axios';

import { AppThunk, AppThunkDispatch } from '../../store/store';
import { getStorageItem } from '../../shared/helpers';
import { IUser } from '../../interfaces/user.interface';

export interface IUserState {
  list: IUser[],
  user: IUser,
  error: string | null,
  loading: boolean,
  updating: boolean,
}

const initialState: IUserState = {
  list: [],
  user: {
    id: '',
    username: '',
    name: '',
    email: '',
  },
  error: null,
  loading: false,
  updating: false,
};

const startLoading = (state: IUserState) => {
  state.loading = true
}

const loadingFailed = (state: IUserState, action: PayloadAction<string>) => {
  state.loading = false
  state.error = action.payload
}

const startUpdating = (state: IUserState) => {
  state.updating = true
}

const updatingFailed = (state: IUserState, action: PayloadAction<string>) => {
  state.updating = false
  state.error = action.payload
}

const users = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    getUsersStart: startLoading,
    getUserByIdStart: startLoading,
    updateUserStart: startUpdating,
    getUsersSuccess(state, { payload }: PayloadAction<IUser[]>) {
      state.list = payload;
      state.loading = false;
      state.error = null;
    },
    getUserByIdSuccess(state, { payload }: PayloadAction<IUser>) {
      state.user = payload;
      state.loading = false;
      state.error = null;
    },
    updateUserSuccess(state, { payload }: PayloadAction<IUser>) {
      state.user = payload;
      state.updating = false;
      state.error = null;
    },
    getUsersFailure: loadingFailed,
    getUserByIdFailure: loadingFailed,
    updateUserFailure: updatingFailed,
  }
})

export const {
  getUsersStart,
  getUserByIdStart,
  updateUserStart,
  getUsersSuccess,
  getUserByIdSuccess,
  updateUserSuccess,
  getUsersFailure,
  getUserByIdFailure,
  updateUserFailure,
} = users.actions;

export default users.reducer;

export const getUsers = (token: string | null): AppThunk => {
  return async (dispatch: AppThunkDispatch) => {
    try {
      dispatch(getUsersStart());
      const response = await axios.get(`/users.json?auth=${token}`);
      dispatch(getUsersSuccess(Object.values(response.data)));
    } catch (err) {
      dispatch(getUsersFailure(err.response.data.error));
    }
  };
};

export const getUserById = (token: string | null): AppThunk => {
  const id = getStorageItem('userId');
  return async (dispatch: AppThunkDispatch) => {
    try {
      dispatch(getUserByIdStart());
      const response = await axios.get(`/users/${id}.json?auth=${token}`);
      dispatch(getUserByIdSuccess(response.data));
    } catch (err) {
      dispatch(getUserByIdFailure(err.response.data.error));
    }
  };
};

export const updateUser = (token: string | null, user: IUser): AppThunk => {
  const id = getStorageItem('userId');
  return async (dispatch: AppThunkDispatch) => {
    try {
      dispatch(updateUserStart());
      const response = await axios.put(`/users/${id}.json?auth=${token}`, user);
      dispatch(updateUserSuccess(response.data));
    } catch (err) {
      dispatch(updateUserFailure(err.response.data.error));
    }
  };
};

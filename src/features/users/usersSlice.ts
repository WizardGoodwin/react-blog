import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { getStorageItem } from '../../shared/helpers';
import { IUser } from '../../interfaces/user.interface';
import * as api from '../../api';


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
  name: 'users',
  initialState: initialState,
  reducers: {
    getUsers: startLoading,
    getUserById: startLoading,
    updateUser: startUpdating,
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
  getUsersSuccess,
  getUserByIdSuccess,
  updateUserSuccess,
  getUsersFailure,
  getUserByIdFailure,
  updateUserFailure,
} = users.actions;

export const getUsers = createAction<string | null>('users/getUsers');

export const getUserById = createAction<string | null>('users/getUserById');

export const updateUser = createAction<{ token: string | null, user: IUser }>('users/updateUser');

export default users.reducer;


function* getUsersSaga({ payload }: PayloadAction<string | null>) {
  try {
    const response = yield call(api.getUsers, payload);
    yield put(getUsersSuccess(Object.values(response.data)))
  } catch (err) {
    yield put(getUsersFailure(err.response.data.error))
  }
}

function* getUserByIdSaga({ payload }: PayloadAction<string | null>) {
  try {
    const id = getStorageItem('userId');
    const response = yield call(api.getUserById, payload, id);
    yield put(getUserByIdSuccess(response.data));
  } catch (err) {
    yield put(getUserByIdFailure(err.response.data.error))
  }
}

function* updateUserSaga({ payload }: PayloadAction<{ token: string | null, user: IUser }>) {
  try {
    const { token, user } = payload;
    const id = getStorageItem('userId');
    const response = yield call(api.updateUser, token, id, user);
    yield put(updateUserSuccess(response.data));
  } catch (err) {
    yield put(updateUserFailure(err.response.data.error))
  }
}

export function* usersSaga() {
  yield takeLatest(getUsers, getUsersSaga);
  yield takeLatest(getUserById, getUserByIdSaga);
  yield takeEvery(updateUser, updateUserSaga);
}

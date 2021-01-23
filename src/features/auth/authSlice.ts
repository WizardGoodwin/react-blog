import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { deleteStorageItem, getStorageItem, setStorageItem } from '../../shared/helpers';
import { IUser } from '../../interfaces/user.interface';
import { ISignUpForm } from './SignUp';
import { ISignInForm } from './SignIn';
import { UserResponse } from '../../interfaces/api-responses';
import * as api from '../../api';


export interface IAuthState {
  token: string | null;
  userId: string | null;
  username: string | null;
  error: string | null;
  loading: boolean;
}

interface IAuthPayload {
  token: string;
  userId: string;
  username: string;
}

const initialState: IAuthState = {
  token: getStorageItem('token'),
  userId: getStorageItem('userId'),
  username: getStorageItem('username'),
  error: null,
  loading: false,
};

const startLoading = (state: IAuthState) => {
  state.loading = true
}

const loadingFailed = (state: IAuthState, { payload }: PayloadAction<string>) => {
  state.loading = false
  state.error = payload
}

const signSuccess = (state: IAuthState, { payload }: PayloadAction<IAuthPayload>) => {
  const { token, userId, username } = payload;
  state.token = token;
  state.userId = userId;
  state.username = username;
  state.loading = false;
  state.error = null;
}

const auth = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    signIn: startLoading,
    signUp: startLoading,
    signUpSuccess: signSuccess,
    signInSuccess: signSuccess,
    signInFailure: loadingFailed,
    signUpFailure: loadingFailed,
    logOutSuccess(state) {
      state.token = '';
      state.userId = '';
      state.username = '';
    },
  }
})

export const {
  signInSuccess,
  signUpSuccess,
  logOutSuccess,
  signInFailure,
  signUpFailure,
} = auth.actions;

export const signUp = createAction<ISignUpForm>('auth/signUp');

export const signIn = createAction<ISignInForm>('auth/signIn');

export const logOut = createAction<undefined>('auth/logOut');

export default auth.reducer;


function* signUpSaga({ payload }: PayloadAction<ISignUpForm>) {
  try {
    const authResponse = yield call(api.signUp, payload);
    const { idToken: token, localId: tempId } = authResponse.data;
    setStorageItem('token', token);
    const user: IUser = {
      id: tempId,
      email: payload.email,
      username: payload.username,
      name: '',
      phone: '',
      address: '',
      website: '',
    };
    // sending request to create user entity in firebase database
    // (sign up action doesn't create user entity in db - feature of firebase)
    const userResponse = yield call(api.addUser, user);
    const userId = userResponse.data.name;
    setStorageItem('userId', userId);
    yield put(signUpSuccess({ token, userId, username: payload.username }));
  } catch (err) {
    yield put(signUpFailure(err.response.data.error))
  }
}

function* signInSaga({ payload }: PayloadAction<ISignInForm>) {
  try {
    const authResponse = yield call(api.signIn, payload);
    const { idToken: token, localId: tempId } = authResponse.data;
    // finding user in firebase database and setting to local storage his id and username
    const usersResponse = yield call(api.getUsers, token);
    const users: UserResponse[] = Object.entries(usersResponse.data);
    const user = users.find((user: UserResponse) => user[1].id === tempId);
    if (user) {
      setStorageItem('token', token);
      setStorageItem('userId', user[0]);
      setStorageItem('username', user[1].username);
      yield put(signInSuccess({ token, userId: user[0], username: user[1].username }));
    } else throw new Error('User not found');
  } catch (err) {
    yield put(signInFailure(err.response.data.error))
  }
}

function* logOutSaga() {
  deleteStorageItem('token');
  deleteStorageItem('userId');
  deleteStorageItem('username');
  yield put(logOutSuccess())
}

export function* authSaga() {
  yield takeLatest(signUp, signUpSaga);
  yield takeLatest(signIn, signInSaga);
  yield takeEvery(logOut, logOutSaga);
}

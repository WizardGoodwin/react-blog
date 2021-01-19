import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../axios';

import { AppThunk, AppThunkDispatch } from '../../store/store';
import { deleteStorageItem, getStorageItem, setStorageItem } from '../../shared/helpers';
import { IUser } from '../../interfaces/user.interface';
import { ISignUpForm } from './SignUp';
import { IAuthResponse, IUserPostResponse, UserResponse } from '../../interfaces/api-responses';
import { SIGN_IN_URL, SIGN_UP_URL } from '../../shared/constants';
import { ISignInForm } from './SignIn';

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
    signInStart: startLoading,
    signUpStart: startLoading,
    signUpSuccess: signSuccess,
    signInSuccess: signSuccess,
    signInFailure: loadingFailed,
    signUpFailure: loadingFailed,
    logOut(state) {
      state.token = '';
      state.userId = '';
      state.username = '';
    },
  }
})

export const {
  signInStart,
  signUpStart,
  signInSuccess,
  signUpSuccess,
  signInFailure,
  signUpFailure,
  logOut
} = auth.actions;

export default auth.reducer;

export const signUp = (authData: ISignUpForm): AppThunk => {
  return async (dispatch: AppThunkDispatch) => {
    try {
      dispatch(signUpStart());
      const authResponse: IAuthResponse = await axios.post(SIGN_UP_URL, { ...authData, returnSecureToken: true });
      const token = authResponse.data.idToken;
      const tempId = authResponse.data.localId;
      setStorageItem('token', token);
      const user: IUser = {
        id: tempId,
        email: authData.email,
        username: authData.username,
        name: '',
        phone: '',
        address: '',
        website: '',
      };
      // sending request to create user entity in firebase database
      // (sign up action doesn't create user entity in db - feature of firebase)
      const userResponse: IUserPostResponse = await axios.post('/users.json', user);
      const userId = userResponse.data.name;
      setStorageItem('userId', userId);
      dispatch(signUpSuccess({ token, userId, username: authData.username }));
    } catch(err) {
      dispatch(signUpFailure(err.response.data.error));
    }
  };
};

export const signIn = (authData: ISignInForm): AppThunk => {
  return async (dispatch: AppThunkDispatch) => {
    try {
      dispatch(signInStart());
      const authResponse: IAuthResponse = await axios.post(SIGN_IN_URL, { ...authData, returnSecureToken: true });
      const token = authResponse.data.idToken;
      const tempId = authResponse.data.localId;
      // finding user in firebase database and setting to local storage his id and username
      const usersResponse = await axios.get('/users.json');
      const users: UserResponse[] = Object.entries(usersResponse.data);
      const user = users.find((user: UserResponse) => user[1].id === tempId);
      if (user) {
        setStorageItem('token', token);
        setStorageItem('userId', user[0]);
        setStorageItem('username', user[1].username);
        dispatch(signInSuccess({ token, userId: user[0], username: user[1].username }));
      } else throw new Error('User not found');
    } catch(err) {
      dispatch(signInFailure(err.response.data.error));
    }
  };
};

export const userLogOut = () => {
  deleteStorageItem('token');
  deleteStorageItem('userId');
  deleteStorageItem('username');
  return (dispatch: AppThunkDispatch) => {
    dispatch(logOut());
  };
}

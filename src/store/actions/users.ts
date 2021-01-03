import axios from '../../axios';

import { ActionTypes } from './actionTypes';
import { IUser } from '../../interfaces/user.interface';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export interface IGetUsersRequest {
  type: ActionTypes.GET_USERS_REQUEST;
}

export interface IGetUsersSuccess {
  type: ActionTypes.GET_USERS_SUCCESS;
  users: IUser[]
}

export interface IGetUsersFail {
  type: ActionTypes.GET_USERS_FAIL;
  error: string;
}

export interface IGetUserByIdRequest {
  type: ActionTypes.GET_USER_BY_ID_REQUEST;
}

export interface IGetUserByIdSuccess {
  type: ActionTypes.GET_USER_BY_ID_SUCCESS;
  user: IUser;
}

export interface IGetUserByIdFail {
  type: ActionTypes.GET_USER_BY_ID_FAIL;
  error: string;
}

export interface IUpdateUserRequest {
  type: ActionTypes.UPDATE_USER_REQUEST;
}

export interface IUpdateUserSuccess {
  type: ActionTypes.UPDATE_USER_SUCCESS;
  user: IUser;
}

export interface IUpdateUserFail {
  type: ActionTypes.UPDATE_USER_FAIL;
  error: string;
}

const getUsersRequest = (): IGetUsersRequest => {
  return {
    type: ActionTypes.GET_USERS_REQUEST,
  };
};

const getUsersSuccess = (users: IUser[]): IGetUsersSuccess => {
  return {
    type: ActionTypes.GET_USERS_SUCCESS,
    users,
  };
};

const getUsersFail = (error: string): IGetUsersFail => {
  return {
    type: ActionTypes.GET_USERS_FAIL,
    error,
  };
};

const getUserByIdRequest = (): IGetUserByIdRequest => {
  return {
    type: ActionTypes.GET_USER_BY_ID_REQUEST,
  };
};

const getUserByIdSuccess = (user: IUser): IGetUserByIdSuccess => {
  return {
    type: ActionTypes.GET_USER_BY_ID_SUCCESS,
    user,
  };
};

const getUserByIdFail = (error: string): IGetUserByIdFail => {
  return {
    type: ActionTypes.GET_USER_BY_ID_FAIL,
    error,
  };
};

const updateUserRequest = (): IUpdateUserRequest => {
  return {
    type: ActionTypes.UPDATE_USER_REQUEST,
  };
};

const updateUserSuccess = (user: IUser): IUpdateUserSuccess => {
  return {
    type: ActionTypes.UPDATE_USER_SUCCESS,
    user,
  };
};

const updateUserFail = (error: string): IUpdateUserFail => {
  return {
    type: ActionTypes.UPDATE_USER_FAIL,
    error,
  };
};

export const getUsers = (token: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getUsersRequest());
    try {
      const response = await axios.get(`/users.json?auth=${token}`);
      dispatch(getUsersSuccess(Object.values(response.data)));
    } catch (err) {
      dispatch(getUsersFail(err.response.data.error));
    }
  };
};

export const getUserById = (token: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  const id = localStorage.getItem('userId');
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getUserByIdRequest());
    try {
      const response = await axios.get(`/users/${id}.json?auth=${token}`);
      dispatch(getUserByIdSuccess(response.data));
    } catch (err) {
      dispatch(getUserByIdFail(err.response.data.error));
    }
  };
};

export const updateUser = (token: string, user: IUser): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  const id = localStorage.getItem('userId');
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(updateUserRequest());
    try {
      const response = await axios.put(`/users/${id}.json?auth=${token}`, user);
      dispatch(updateUserSuccess(response.data));
    } catch (err) {
      dispatch(updateUserFail(err.response.data.error));
    }
  };
};

export type UserAction = IGetUsersRequest | IGetUsersSuccess | IGetUsersFail | IGetUserByIdRequest |
  IGetUserByIdSuccess | IGetUserByIdFail | IUpdateUserRequest | IUpdateUserSuccess | IUpdateUserFail;

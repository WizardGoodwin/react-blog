import { ActionTypes } from '../actions/actionTypes';
import { IUser } from '../../interfaces/user.interface';
import {
  IGetUserByIdFail,
  IGetUserByIdSuccess,
  IGetUsersFail,
  IGetUsersSuccess, IUpdateUserFail,
  IUpdateUserSuccess,
  UserAction,
} from '../actions/users';

export interface IUserState {
  users: IUser[],
  user: IUser,
  error: string | null,
  userLoading: boolean,
  userUpdating: boolean,
  usersLoading: boolean,
}

const initialState: IUserState = {
  users: [],
  user: {
    id: '',
    username: '',
    name: '',
    email: '',
  },
  error: null,
  userLoading: true,
  userUpdating: false,
  usersLoading: true,
};

const getUsersRequest = (state: IUserState): IUserState => {
  return {
    ...state,
    error: null,
    usersLoading: true,
  };
};

const getUsersSuccess = (state: IUserState, action: IGetUsersSuccess): IUserState => {
  return {
    ...state,
    users: action.users,
    error: null,
    usersLoading: false,
  };
};

const getUsersFail = (state: IUserState, action: IGetUsersFail): IUserState => {
  return {
    ...state,
    error: action.error,
    usersLoading: false,
  };
};

const getUserByIdRequest = (state: IUserState): IUserState => {
  return {
    ...state,
    error: null,
    userLoading: true,
  };
};

const getUserByIdSuccess = (state: IUserState, action: IGetUserByIdSuccess): IUserState => {
  return {
    ...state,
    user: action.user,
    error: null,
    userLoading: false,
  };
};

const getUserByIdFail = (state: IUserState, action: IGetUserByIdFail): IUserState => {
  return {
    ...state,
    error: action.error,
    userLoading: false,
  };
};

const updateUserRequest = (state: IUserState): IUserState => {
  return {
    ...state,
    error: null,
    userUpdating: true,
  };
};

const updateUserSuccess = (state: IUserState, action: IUpdateUserSuccess): IUserState => {
  return {
    ...state,
    user: action.user,
    error: null,
    userUpdating: false,
  };
};

const updateUserFail = (state: IUserState, action: IUpdateUserFail): IUserState => {
  return {
    ...state,
    error: action.error,
    userUpdating: false,
  };
};

const usersReducer = (state: IUserState = initialState, action: UserAction) => {
  switch (action.type) {
    case ActionTypes.GET_USERS_REQUEST:
      return getUsersRequest(state);
    case ActionTypes.GET_USERS_SUCCESS:
      return getUsersSuccess(state, action);
    case ActionTypes.GET_USERS_FAIL:
      return getUsersFail(state, action);
    case ActionTypes.GET_USER_BY_ID_REQUEST:
      return getUserByIdRequest(state);
    case ActionTypes.GET_USER_BY_ID_SUCCESS:
      return getUserByIdSuccess(state, action);
    case ActionTypes.GET_USER_BY_ID_FAIL:
      return getUserByIdFail(state, action);
    case ActionTypes.UPDATE_USER_REQUEST:
      return updateUserRequest(state);
    case ActionTypes.UPDATE_USER_SUCCESS:
      return updateUserSuccess(state, action);
    case ActionTypes.UPDATE_USER_FAIL:
      return updateUserFail(state, action);
    default:
      return state;
  }
};

export default usersReducer;

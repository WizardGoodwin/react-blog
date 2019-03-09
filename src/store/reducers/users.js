import * as actionTypes from '../actions/actionTypes';

const initialState = {
  users: [],
  user: {},
  error: null,
  userLoading: true,
  userUpdating: false,
  usersLoading: true,
};

const getUsersRequest = (state) => {
  return {
    ...state,
    error: null,
    usersLoading: true,
  };
};

const getUsersSuccess = (state, action) => {
  return {
    ...state,
    users: action.users,
    error: null,
    usersLoading: false,
  };
};

const getUsersFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    usersLoading: false,
  };
};

const getUserByIdRequest = (state) => {
  return {
    ...state,
    error: null,
    userLoading: true,
  };
};

const getUserByIdSuccess = (state, action) => {
  return {
    ...state,
    user: action.user,
    error: null,
    userLoading: false,
  };
};

const getUserByIdFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    userLoading: false,
  };
};

const updateUserRequest = (state) => {
  return {
    ...state,
    error: null,
    userUpdating: true,
  };
};

const updateUserSuccess = (state, action) => {
  return {
    ...state,
    user: action.user,
    error: null,
    userUpdating: false,
  };
};

const updateUserFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    userUpdating: false,
  };
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USERS_REQUEST:
      return getUsersRequest(state, action);
    case actionTypes.GET_USERS_SUCCESS:
      return getUsersSuccess(state, action);
    case actionTypes.GET_USERS_FAIL:
      return getUsersFail(state, action);
    case actionTypes.GET_USER_BY_ID_REQUEST:
      return getUserByIdRequest(state, action);
    case actionTypes.GET_USER_BY_ID_SUCCESS:
      return getUserByIdSuccess(state, action);
    case actionTypes.GET_USER_BY_ID_FAIL:
      return getUserByIdFail(state, action);
    case actionTypes.UPDATE_USER_REQUEST:
      return updateUserRequest(state, action);
    case actionTypes.UPDATE_USER_SUCCESS:
      return updateUserSuccess(state, action);
    case actionTypes.UPDATE_USER_FAIL:
      return updateUserFail(state, action);
    default:
      return state;
  }
};

export default usersReducer;

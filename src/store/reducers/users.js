import * as actionTypes from '../actions/actionTypes';

const initialState = {
  users: [],
  error: null,
  loading: true,
};

const getUsersRequest = (state) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};

const getUsersSuccess = (state, action) => {
  return {
    ...state,
    users: action.users,
    error: null,
    loading: false,
  };
};

const getUsersFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
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
    default:
      return state;
  }
};

export default usersReducer;

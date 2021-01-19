import { IState } from '../rootReducer';

export const selectAuthLoading = (state: IState) => state.auth.loading;
export const selectAuthToken = (state: IState) => state.auth.token;
export const selectIsUserLoggedIn = (state: IState) => !!state.auth.token;
export const selectAuthError = (state: IState) => state.auth.error;
export const selectUserId = (state: IState) => state.auth.userId;
export const selectUsername = (state: IState) => state.auth.username;


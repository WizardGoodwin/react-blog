import { IState } from '../reducers';

export const selectUsersList = (state: IState) => state.users.list;
export const selectUsersLoading = (state: IState) => state.users.usersLoading;
export const selectUsersError = (state: IState) => state.users.error;
export const selectUser = (state: IState) => state.users.user;
export const selectUserUpdating = (state: IState) => state.users.userUpdating;

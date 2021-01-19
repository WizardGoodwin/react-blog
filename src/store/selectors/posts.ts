import { IState } from '../rootReducer';

export const selectPostsList = (state: IState) => state.posts.list;
export const selectLastPostsList = (state: IState) => state.posts.list.slice(-5);
export const selectPostsLoading = (state: IState) => state.posts.loading;
export const selectPostsError = (state: IState) => state.posts.error;

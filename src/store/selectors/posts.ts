import { IState } from '../rootReducer';

export const selectPostsList = (state: IState) => state.posts.list;
export const selectLastPostsList = (state: IState) => state.posts.list.slice(-5);
export const selectPostsLoading = (state: IState) => state.posts.loading;
export const selectPostUpdating = (state: IState) => state.posts.updating;
export const selectPostUpdated = (state: IState) => state.posts.updated;
export const selectPostDeleting = (state: IState) => state.posts.deleting;
export const selectPostsError = (state: IState) => state.posts.error;

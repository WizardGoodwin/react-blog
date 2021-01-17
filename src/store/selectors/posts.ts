import { IState } from '../reducers';

export const selectPostsList = (state: IState) => state.posts.list;
export const selectPostsLoading = (state: IState) => state.posts.postsLoading;
export const selectPostsError = (state: IState) => state.posts.postsError;

import { IState } from '../reducers';

export const selectCommentsList = (state: IState) => state.comments.list;
export const selectCommentsLoading = (state: IState) => state.comments.commentsLoading;
export const selectCommentsError = (state: IState) => state.comments.commentsError;

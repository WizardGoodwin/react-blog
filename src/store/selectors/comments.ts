import { IState } from '../rootReducer';

export const selectCommentsList = (state: IState) => state.comments.list;
export const selectCommentsLoading = (state: IState) => state.comments.loading;
export const selectCommentAdding = (state: IState) => state.comments.adding;
export const selectCommentsError = (state: IState) => state.comments.error;

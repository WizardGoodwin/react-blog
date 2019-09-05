import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';

import CommentsList from '../pages/Comments/CommentsList/CommentsList';
import Spinner from '../shared/Spinner/Spinner';
import ErrorIndicator from '../shared/ErrorIndicator/ErrorIndicator';
import {
  getComments,
  incLikeCounter,
  incDislikeCounter,
} from '../store/actions/comments';
import { IState } from '../store/reducers';
import { IAuthState } from '../store/reducers/auth';
import { ICommentState } from '../store/reducers/comments';
import { IComment } from '../interfaces/comment.interface';
import { CommentResponse } from '../interfaces/api-responses';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

interface IProps {
  comments: CommentResponse[];
  commentsError: string;
  commentsLoading: boolean;
  getComments(): any;
  incLikeCounter(): any;
  incDislikeCounter(): any;
}

const CommentsContainer: FunctionComponent<IProps> = (props) => {
  const { comments, commentsError, commentsLoading, getComments, incLikeCounter, incDislikeCounter } = props;
  // fetching all comments from backend
  useEffect(() => {
    getComments();
  }, []);

  if (commentsError) {
    return <ErrorIndicator />;
  }

  if (commentsLoading) {
    return <Spinner />;
  } else {
    return (
      <CommentsList
        comments={comments}
        incLikeCounter={incLikeCounter}
        incDislikeCounter={incDislikeCounter}
      />
    );
  }
};

const mapStateToProps = (state: IState) => {
  const authState: IAuthState = state.auth;
  const commentsState: ICommentState = state.comments;
  return {
    isAuth: authState.token !== null,
    token: authState.token,
    comments: commentsState.comments,
    commentsLoading: commentsState.commentsLoading,
    commentsError: commentsState.commentsError,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getComments: () => dispatch(getComments()),
    incLikeCounter: (id: string, comment: IComment) => dispatch(incLikeCounter(id, comment)),
    incDislikeCounter: (id: string, comment: IComment) =>
      dispatch(incDislikeCounter(id, comment)),
  };
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps,)(CommentsContainer);

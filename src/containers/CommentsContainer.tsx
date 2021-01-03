import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CommentsList from '../pages/Comments/CommentsList/CommentsList';
import Spinner from '../shared/Spinner/Spinner';
import ErrorIndicator from '../shared/ErrorIndicator/ErrorIndicator';
import {
  getComments,
  incLikeCounter,
  incDislikeCounter,
} from '../store/actions/comments';
import { IState } from '../store/reducers';

const CommentsContainer: FC = () => {
  const comments = useSelector((state: IState) => state.comments.comments);
  const commentsLoading = useSelector((state: IState) => state.comments.commentsLoading);
  const commentsError = useSelector((state: IState) => state.comments.commentsError);
  const dispatch = useDispatch();

  // fetching all comments from backend
  useEffect(() => {
    dispatch(getComments());
  }, [dispatch]);

  if (commentsError) {
    return <ErrorIndicator />;
  }

  return commentsLoading ? (
    <Spinner />
  ) : (
    <CommentsList
      comments={comments}
      incLikeCounter={incLikeCounter}
      incDislikeCounter={incDislikeCounter}
    />
  );
};

export default CommentsContainer;

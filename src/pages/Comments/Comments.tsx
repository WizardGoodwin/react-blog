import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getComments } from '../../store/actions/comments';
import { IState } from '../../store/reducers';
import ErrorIndicator from '../../shared/ErrorIndicator/ErrorIndicator';
import Spinner from '../../shared/Spinner/Spinner';
import CommentsList from './CommentsList';


const Comments: FC = () => {
  const commentsLoading = useSelector((state: IState) => state.comments.commentsLoading);
  const commentsError = useSelector((state: IState) => state.comments.commentsError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComments());
  }, [dispatch]);

  if (commentsError) {
    return <ErrorIndicator />;
  }

  return commentsLoading ? (
    <Spinner />
  ) : (
    <CommentsList />
  );
};

export default Comments;

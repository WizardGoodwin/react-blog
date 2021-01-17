import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getComments } from '../../store/actions/comments';
import ErrorIndicator from '../../shared/ErrorIndicator/ErrorIndicator';
import Spinner from '../../shared/Spinner/Spinner';
import CommentsList from './CommentsList';
import { selectCommentsError, selectCommentsLoading } from '../../store/selectors/comments';


const Comments: FC = () => {
  const commentsLoading = useSelector(selectCommentsLoading);
  const commentsError = useSelector(selectCommentsError);
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

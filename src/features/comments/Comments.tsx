import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ErrorIndicator from '../../shared/ErrorIndicator/ErrorIndicator';
import Spinner from '../../shared/Spinner/Spinner';
import CommentsList from './CommentsList';
import { selectCommentsError, selectCommentsList, selectCommentsLoading } from '../../store/selectors/comments';
import { getComments } from './commentsSlice';


const Comments: FC = () => {
  const commentsList = useSelector(selectCommentsList);
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
    <CommentsList comments={commentsList} />
  );
};

export default Comments;

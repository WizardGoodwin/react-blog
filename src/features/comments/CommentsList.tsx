import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { CommentResponse } from '../../interfaces/api-responses';
import { selectCommentsList } from '../../store/selectors/comments';
import Comment from './Comment';


const CommentsList: FC = () => {
  const commentsList = useSelector(selectCommentsList);

  return (
    <div className="comment-list mt-5">
      <h4 className="mb-5">Comments:</h4>
      {commentsList.map((comment: CommentResponse) => {
        return (
          <Comment
            key={comment[0]}
            commentId={comment[0]}
            comment={comment[1]}
          />
        );
      })}
    </div>
  );
};

export default CommentsList;

import React, { FC } from 'react';

import { CommentResponse } from '../../interfaces/api-responses';
import Comment from './Comment';


interface IProps {
  comments: CommentResponse[];
}

const CommentsList: FC<IProps> = ({ comments }) => {
  return (
    <div className="comment-list mt-5">
      <h4 className="mb-5">Comments:</h4>
      {comments.map((comment: CommentResponse) => {
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

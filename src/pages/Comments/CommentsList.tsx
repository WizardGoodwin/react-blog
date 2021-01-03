import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { IState } from '../../store/reducers';
import { CommentResponse } from '../../interfaces/api-responses';
import Comment from './Comment';


const CommentsList: FC = () => {
  const commentsList = useSelector((state: IState) => state.comments.list);

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

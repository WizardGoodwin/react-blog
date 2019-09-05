import React, { FunctionComponent } from 'react';

import Comment from '../Comment/Comment';
import { IComment } from '../../../interfaces/comment.interface';
import { CommentResponse } from '../../../interfaces/api-responses';



interface IProps {
  comments: CommentResponse[];
  incLikeCounter(commentId: string, comment: IComment): any;
  incDislikeCounter(commentId: string, comment: IComment): any;
}

const CommentsList: FunctionComponent<IProps> = ({ comments, incLikeCounter, incDislikeCounter }) => {
  return (
    <div className="comment-list mt-5">s
      <h4 className="mb-5">Comments:</h4>
      {comments.map((comment: CommentResponse) => {
        return (
          <Comment
            key={comment[0]}
            commentId={comment[0]}
            comment={comment[1]}
            incLikeCounter={incLikeCounter}
            incDislikeCounter={incDislikeCounter}
          />
        );
      })}
    </div>
  );
};

export default CommentsList;

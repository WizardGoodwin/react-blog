import React from 'react';

import Comment from '../Comment/Comment';

const CommentsList = ({ comments, incLikeCounter, incDislikeCounter }) => {
  return (
    <div className="comment-list mt-5">
      <h4 className="mb-5">Comments:</h4>
      {comments.map((comment) => {
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

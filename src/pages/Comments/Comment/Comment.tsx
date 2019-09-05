import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { IComment } from '../../../interfaces/comment.interface';

interface IProps {
  commentId: string;
  comment: IComment;
  incLikeCounter(commentId: string, comment: IComment): any;
  incDislikeCounter(commentId: string, comment: IComment): any;
}

const Comment: FunctionComponent<IProps> = ({ commentId, comment, incLikeCounter, incDislikeCounter }) => {
  const {
    author,
    commentTitle,
    commentBody,
    likeCounter,
    dislikeCounter,
  } = comment;

  return (
    <div className="media mt-4 ml-4">
      <div className="media-body mb-3">
        <h6 className="card-subtitle mb-2 text-info">
          <Link to={`/users/${author}`}>{author}</Link>
        </h6>
        <h5 className="mt-0">{commentTitle}</h5>
        <p>{commentBody}</p>
        <div className="row">
          <p className="text-info mr-5">
            <i
              className="fa fa-thumbs-up text-info pr-2"
              onClick={() => incLikeCounter(commentId, comment)}
            />
            {likeCounter}
          </p>
          <p className="text-danger">
            <i
              className="fa fa-thumbs-down pr-2"
              onClick={() => incDislikeCounter(commentId, comment)}
            />
            {dislikeCounter}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;

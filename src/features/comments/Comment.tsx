import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { IComment } from '../../interfaces/comment.interface';
import { incrementDislikeCounter, incrementLikeCounter } from './commentsSlice';


interface IProps {
  commentId: string;
  comment: IComment;
}

const Comment: FC<IProps> = ({ commentId, comment }) => {
  const {
    author,
    commentTitle,
    commentBody,
    likeCounter,
    dislikeCounter,
  } = comment;
  const dispatch = useDispatch();

  const increaseLikeCounter = () => dispatch(incrementLikeCounter(commentId, comment));

  const increaseDislikeCounter = () => dispatch(incrementDislikeCounter(commentId, comment));

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
              onClick={increaseLikeCounter}
            />
            {likeCounter}
          </p>
          <p className="text-danger">
            <i
              className="fa fa-thumbs-down pr-2"
              onClick={increaseDislikeCounter}
            />
            {dislikeCounter}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;

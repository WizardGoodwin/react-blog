import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CommentForm from '../Comments/CommentForm';
import Spinner from '../../shared/Spinner/Spinner';
import ErrorIndicator from '../../shared/ErrorIndicator/ErrorIndicator';
import { addComment, getCommentsByPostId } from '../../store/actions/comments';
import { PostResponse } from '../../interfaces/api-responses';
import image from '../../assets/images/Post.jpg';
import CommentsList from '../Comments/CommentsList';
import { isUserLoggedIn } from '../../shared/helpers';
import { selectAuthToken } from '../../store/selectors/auth';
import { selectCommentsError, selectCommentsList, selectCommentsLoading } from '../../store/selectors/comments';


interface IProps {
  post: PostResponse;
}

const Post: FC<IProps> = ({ post }) => {
  const postId = post[0];
  const { title, body, created_at, author } = post[1];

  const token = useSelector(selectAuthToken);
  const commentsList = useSelector(selectCommentsList);
  const commentsLoading = useSelector(selectCommentsLoading);
  const commentsError = useSelector(selectCommentsError);
  const dispatch = useDispatch();

  const [commentForm, setCommentValues] = useState({
    commentTitle: '',
    commentBody: '',
    likeCounter: 0,
    dislikeCounter: 0,
  });

  useEffect(() => {
    dispatch(getCommentsByPostId(postId));
  }, [dispatch, postId]);

  const onCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCommentValues({
      ...commentForm,
      [id]: value,
    });
  };

  const onCommentSubmit = (e: FormEvent, postId: string) => {
    e.preventDefault();
    dispatch(addComment(token, { ...commentForm, postId }));
    setCommentValues({
      commentTitle: '',
      commentBody: '',
      likeCounter: 0,
      dislikeCounter: 0,
    });
  };

  if (commentsError) {
    return <ErrorIndicator />;
  }

  return commentsLoading ? (
    <Spinner />
  ): (
    <>
      <div className="card shadow my-4">
        <img className="card-img-top" src={image} alt="post" />
        <div className="card-body">
          <h3 className="card-title">{title}</h3>
          <p className="card-text">{body}</p>
          <p className="card-text">
            <small className="text-muted">{created_at}</small>
          </p>
          <Link to={`/users/${author}`}>by {author}</Link>
        </div>
        <div className="card-footer">
          <Link to={'/posts'} className="card-link">
            Go to posts list
          </Link>
        </div>
      </div>

      {commentsList.length === 0 ? (
        <h5 className="text-info mb-4">There are no comments yet</h5>
      ) : (
        <CommentsList />
      )}

      {isUserLoggedIn() ? (
        // if user is logged in, then show comment adding form, else show text
        <CommentForm
          form={commentForm}
          postId={postId}
          onCommentChange={onCommentChange}
          onSubmit={onCommentSubmit}
        />
      ) : (
        <div className="card shadow-sm mt-4">
          <div className="card-body">
            <h5 className="text-danger">
              Only registered users can add comments
            </h5>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;

import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Post from '../pages/Posts/Post/Post';
import CommentForm from '../pages/Comments/CommentForm/CommentForm';
import CommentsList from '../pages/Comments/CommentsList/CommentsList';
import Spinner from '../shared/Spinner/Spinner';
import ErrorIndicator from '../shared/ErrorIndicator/ErrorIndicator';
import {
  addComment,
  getCommentsByPostId,
  incDislikeCounter,
  incLikeCounter,
} from '../store/actions/comments';
import { IState } from '../store/reducers';
import { PostResponse } from '../interfaces/api-responses';

interface IProps {
  post: PostResponse;
}

const PostContainer: FC<IProps> = ({
  post,
}) => {
  const isAuth = useSelector((state: IState) => state.auth.token.length > 0);
  const token = useSelector((state: IState) => state.auth.token);
  const comments = useSelector((state: IState) => state.comments.comments);
  const commentsLoading = useSelector((state: IState) => state.comments.commentsLoading);
  const commentsError = useSelector((state: IState) => state.comments.commentsError);
  const dispatch = useDispatch();

  const [commentForm, setCommentValues] = useState({
    commentTitle: '',
    commentBody: '',
    likeCounter: 0,
    dislikeCounter: 0,
  });
  const postId = post[0];

  // fetching comments for one post from backend
  useEffect(() => {
    dispatch(getCommentsByPostId(postId));
  }, [dispatch, postId]);

  // handling change of comment form inputs
  const onCommentChange = (e: ChangeEvent) => {
    const { id, value } = e.target as any;
    setCommentValues({
      ...commentForm,
      [id]: value,
    });
  };

  // handling comment form submit
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
      <Post post={post} />

      {comments.length === 0 ? (
        <h5 className="text-info mb-4">There are no comments yet</h5>
      ) : (
        <CommentsList
          comments={comments}
          incLikeCounter={incLikeCounter}
          incDislikeCounter={incDislikeCounter}
        />
      )}

      {isAuth ? (
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

export default PostContainer;

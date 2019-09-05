import React, { ChangeEvent, FormEvent, Fragment, FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';

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
import { IAuthState } from '../store/reducers/auth';
import { ICommentState } from '../store/reducers/comments';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { IComment } from '../interfaces/comment.interface';
import { CommentResponse, PostResponse } from '../interfaces/api-responses';

interface IProps {
  post: PostResponse;
  isAuth: boolean;
  token: string;
  comments: CommentResponse[];
  commentsLoading: boolean;
  commentsError: string;
  addComment(token: string, comment: IComment): any;
  getCommentsByPostId(postId: string): any;
  incLikeCounter(): any;
  incDislikeCounter(): any;
}

const PostContainer: FunctionComponent<IProps> = ({
  post,
  isAuth,
  token,
  comments,
  commentsLoading,
  commentsError,
  addComment,
  getCommentsByPostId,
  incLikeCounter,
  incDislikeCounter,
}) => {
  // state for handling adding comment form
  const [commentForm, setCommentValues] = useState({
    commentTitle: '',
    commentBody: '',
    likeCounter: 0,
    dislikeCounter: 0,
  });
  const postId = post[0];

  // fetching comments for one post from backend
  useEffect(() => {
    getCommentsByPostId(postId);
  }, []);

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
    addComment(token, { ...commentForm, postId });
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

  if (commentsLoading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <Post post={post} />

        {comments.length === 0 ? (
          //if there are no comments, then text below, else render comments list
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
      </Fragment>
    );
  }
};

const mapStateToProps = (state: IState) => {
  const authState: IAuthState = state.auth;
  const commentsState: ICommentState = state.comments;
  return {
    isAuth: authState.token !== null,
    token: authState.token,
    comments: commentsState.comments,
    commentsLoading: commentsState.commentsLoading,
    commentsError: commentsState.commentsError,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    addComment: (token: string, comment: IComment) => dispatch(addComment(token, comment)),
    getCommentsByPostId: (postId: string) => dispatch(getCommentsByPostId(postId)),
    incLikeCounter: (id: string, comment: IComment) => dispatch(incLikeCounter(id, comment)),
    incDislikeCounter: (id: string, comment: IComment) =>
      dispatch(incDislikeCounter(id, comment)),
  };
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps,)(PostContainer);

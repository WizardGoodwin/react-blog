import React, { Fragment, useEffect, useState } from 'react';
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

const PostContainer = ({
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
  const [commentForm, setCommentValues] = useState({
    commentTitle: '',
    commentBody: '',
    likeCounter: 0,
    dislikeCounter: 0,
  });
  const postId = post[0];

  useEffect(() => {
    getCommentsByPostId(postId);
  }, []);

  // handling comments form methods
  const onCommentChange = (e) => {
    const { id, value } = e.target;
    setCommentValues({
      ...commentForm,
      [id]: value,
    });
  };

  const onCommentSubmit = (e, postId) => {
    e.preventDefault();
    addComment(token, { ...commentForm, postId });
    setCommentValues({ commentTitle: '', commentBody: '' });
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

        { comments.length === 0
            ? <h5 className="text-info mb-4">There are no comments yet</h5>
            : <CommentsList
                comments={comments}
                incLikeCounter={incLikeCounter}
                incDislikeCounter={incDislikeCounter}
              />
        }

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

const mapStateToProps = ({
  auth: { token },
  comments: { comments, commentsLoading, commentsError },
}) => {
  return {
    isAuth: token !== null,
    token,
    comments,
    commentsLoading,
    commentsError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (token, comment) => dispatch(addComment(token, comment)),
    getCommentsByPostId: (postId) => dispatch(getCommentsByPostId(postId)),
    incLikeCounter: (id, comment) => dispatch(incLikeCounter(id, comment)),
    incDislikeCounter: (id, comment) =>
      dispatch(incDislikeCounter(id, comment)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostContainer);

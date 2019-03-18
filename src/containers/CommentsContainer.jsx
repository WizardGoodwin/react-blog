import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import CommentsList from '../pages/Comments/CommentsList/CommentsList';
import Spinner from '../shared/Spinner/Spinner';
import ErrorIndicator from '../shared/ErrorIndicator/ErrorIndicator';
import {
  getComments,
  incLikeCounter,
  incDislikeCounter,
} from '../store/actions/comments';

const CommentsContainer = ({
  comments,
  commentsError,
  commentsLoading,
  getComments,
  incLikeCounter,
  incDislikeCounter,
}) => {

  // fetching all comments from backend
  useEffect(() => {
    getComments();
  }, []);

  if (commentsError) {
    return <ErrorIndicator />;
  }

  if (commentsLoading) {
    return <Spinner />;
  } else {
    return (
      <CommentsList
        comments={comments}
        incLikeCounter={incLikeCounter}
        incDislikeCounter={incDislikeCounter}
      />
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
    getComments: () => dispatch(getComments()),
    incLikeCounter: (id, comment) => dispatch(incLikeCounter(id, comment)),
    incDislikeCounter: (id, comment) =>
      dispatch(incDislikeCounter(id, comment)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentsContainer);

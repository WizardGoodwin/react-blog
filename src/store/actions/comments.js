import axios from '../../axios';
import * as actionTypes from './actionTypes';

const addCommentRequest = () => {
  return {
    type: actionTypes.ADD_COMMENT_REQUEST,
  };
};

const addCommentSuccess = (id, comment) => {
  return {
    type: actionTypes.ADD_COMMENT_SUCCESS,
    id,
    comment,
  };
};

const addCommentFail = (error) => {
  return {
    type: actionTypes.ADD_COMMENT_FAIL,
    error: error,
  };
};

const getCommentsRequest = () => {
  return {
    type: actionTypes.GET_COMMENTS_REQUEST,
  };
};

const getCommentsSuccess = (comments) => {
  return {
    type: actionTypes.GET_COMMENTS_SUCCESS,
    comments: comments,
  };
};

const getCommentsFail = (error) => {
  return {
    type: actionTypes.GET_COMMENTS_FAIL,
    error: error,
  };
};

const getCommentsByPostIdRequest = () => {
  return {
    type: actionTypes.GET_COMMENTS_BY_POST_ID_REQUEST,
  };
};

const getCommentsByPostIdSuccess = (comments) => {
  return {
    type: actionTypes.GET_COMMENTS_BY_POST_ID_SUCCESS,
    comments: comments,
  };
};

const getCommentsByPostIdFail = (error) => {
  return {
    type: actionTypes.GET_COMMENTS_BY_POST_ID_FAIL,
    error: error,
  };
};

const incCounter = (id, comment) => {
  return {
    type: actionTypes.INC_COUNTER,
    id,
    comment,
  };
};

export const addComment = (token, newComment) => {
  // taking author from local storage an adding it to comment object
  const author = localStorage.getItem('username');
  const comment = { ...newComment, author };
  return (dispatch) => {
    dispatch(addCommentRequest());
    axios
      .post(`/comments.json?auth=${token}`, comment)
      .then((response) => {
        const id = response.data.name;
        dispatch(addCommentSuccess(id, comment));
      })
      .catch((err) => {
        dispatch(addCommentFail(err.response.data.error));
      });
  };
};

export const getCommentsByPostId = (postId) => {
  return (dispatch) => {
    dispatch(getCommentsByPostIdRequest());
    axios
      .get(`/comments.json`)
      .then((response) => {
        //convert response object to array of arrays kind of [ id : comment ]
        const allComments = Object.entries(response.data);
        // and finding only those comments which have needed post id
        const comments = allComments.filter(
          (comment) => comment[1].postId === postId,
        );
        dispatch(getCommentsByPostIdSuccess(comments));
      })
      .catch((err) => {
        dispatch(getCommentsByPostIdFail(err.response.data.error));
      });
  };
};

export const getComments = () => {
  return (dispatch) => {
    dispatch(getCommentsRequest());
    axios
      .get(`/comments.json`)
      .then((response) => {
        //convert response object to array of arrays kind of [ id : comment ]
        const comments = Object.entries(response.data);
        dispatch(getCommentsSuccess(comments));
      })
      .catch((err) => {
        dispatch(getCommentsFail(err.response.data.error));
      });
  };
};

export const incLikeCounter = (id, comment) => {
  comment.likeCounter++;
  return (dispatch) => {
    dispatch(incCounter(id, comment));
    axios.put(`/comments/${id}.json`, comment);
  };
};

export const incDislikeCounter = (id, comment) => {
  comment.dislikeCounter++;
  return (dispatch) => {
    dispatch(incCounter(id, comment));
    axios.put(`/comments/${id}.json`, comment);
  };
};

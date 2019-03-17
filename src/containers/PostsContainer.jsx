import React, { Fragment, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import PostsList from '../pages/Posts/PostsList/PostsList';
import PostForm from '../pages/Posts/PostForm/PostForm';
import PostContainer from './PostContainer';
import AddPostBtn from '../pages/Posts/AddPostBtn/AddPostBtn';
import Spinner from '../shared/Spinner/Spinner';
import ErrorIndicator from '../shared/ErrorIndicator/ErrorIndicator';
import {
  addPost,
  deletePost,
  getPosts,
  updatePost,
} from '../store/actions/posts';

Modal.setAppElement('#root');

const PostsContainer = ({
  isAuth,
  token,
  username,
  posts,
  postsLoading,
  postsError,
  postUpdating,
  addPost,
  getPosts,
  updatePost,
  deletePost,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isNewPost, setIsNew] = useState(false);
  const [postForm, setPostValues] = useState({ title: '', body: '' });
  const [postId, setId] = useState(null);

  useEffect(() => {
    getPosts(token);
  }, []);

  // handling posts form methods
  const onPostChange = (e) => {
    const { id, value } = e.target;
    setPostValues({
      ...postForm,
      [id]: value,
    });
  };

  const onAddPost = () => {
    setIsNew(true);
    setPostValues({ title: '', body: '' });
    setModalOpen(true);
  };

  const onPostEdit = (id, post) => {
    setIsNew(false);
    setPostValues(post);
    setId(id);
    setModalOpen(true);
  };

  const onPostDelete = (id) => {
    deletePost(token, id);
  };

  const onPostSubmit = (e) => {
    e.preventDefault();
    //if its new post, then send add action else update action
    isNewPost ? addPost(token, postForm) : updatePost(token, postId, postForm);
    setModalOpen(false);
  };

  if (postsError) {
    return <ErrorIndicator />;
  }

  if (postsLoading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <Route
          path="/posts"
          exact
          render={() => (
            <Fragment>
              {isAuth ? (
                // if user is logged in, then show button, else show text
                <AddPostBtn onAddPost={onAddPost} />
              ) : (
                <div className="card shadow-sm mt-4">
                  <div className="card-body">
                    <h5 className="text-danger">
                      Only registered users can add posts
                    </h5>
                  </div>
                </div>
              )}

              <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setModalOpen(false)}
                className="modal-post"
                overlayClassName="overlay"
                shouldCloseOnOverlayClick={true}
                closeTimeoutMS={300}
              >
                <PostForm
                  form={postForm}
                  isNewPost={isNewPost}
                  onPostChange={onPostChange}
                  setModalOpen={setModalOpen}
                  onSubmit={onPostSubmit}
                />
              </Modal>

              <PostsList
                posts={posts}
                setModalOpen={setModalOpen}
                onPostEdit={onPostEdit}
                onPostDelete={onPostDelete}
                username={username}
              />
            </Fragment>
          )}
        />
        <Route
          path="/posts/:title"
          render={(props) => {
            const title = props.match.params.title;
            const selectedPost = posts.find((post) => post[1].title === title);
            return <PostContainer post={selectedPost} />;
          }}
        />
      </Fragment>
    );
  }
};

const mapStateToProps = ({
  auth: { token, username },
  posts: { posts, postsLoading, postsError, postUpdating },
}) => {
  return {
    isAuth: token !== null,
    token,
    username,
    posts,
    postsLoading,
    postsError,
    postUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: (token) => dispatch(getPosts(token)),
    addPost: (token, post) => dispatch(addPost(token, post)),
    updatePost: (token, id, post) => dispatch(updatePost(token, id, post)),
    deletePost: (token, id) => dispatch(deletePost(token, id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostsContainer);

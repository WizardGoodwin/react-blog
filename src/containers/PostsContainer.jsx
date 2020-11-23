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

//setting parent node for modal window
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
  // state for handling modal windows
  const [isModalOpen, setModalOpen] = useState(false);
  // state for handling change of add new/edit post
  const [isNewPost, setIsNew] = useState(false);
  // state for handling adding post form
  const [postForm, setPostValues] = useState({ title: '', body: '' });
  // state for setting current post id
  const [postId, setId] = useState(null);

  // fetching all posts from backend
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  // handling change of post form inputs
  const onPostChange = (e) => {
    const { id, value } = e.target;
    setPostValues({
      ...postForm,
      [id]: value,
    });
  };

  // handling click on "add new post" button
  const onAddPost = () => {
    setIsNew(true);
    setPostValues({ title: '', body: '' });
    setModalOpen(true);
  };

  // handling click on "edit" button
  const onPostEdit = (id, post) => {
    setIsNew(false);
    setPostValues(post);
    setId(id);
    setModalOpen(true);
  };

  // handling click on "delete" button
  const onPostDelete = (id) => {
    deletePost(token, id);
  };

  // handling post form submit
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
            // extracting :title from path and finding corresponding post in the array
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

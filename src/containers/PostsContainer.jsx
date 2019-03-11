import React, { Fragment, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import PostsList from '../pages/Posts/PostsList/PostsList';
import Post from '../pages/Posts/Post/Post';
import PostForm from '../pages/Posts/PostForm/PostForm';
import Spinner from '../shared/Spinner/Spinner';
import ErrorIndicator from '../shared/ErrorIndicator/ErrorIndicator';
import { addPost, getPosts } from '../store/actions/posts';

Modal.setAppElement('#root');

const PostsContainer = ({ posts, postsLoading, error, postUpdating, addPost, getPosts }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [form, setValues] = useState({title: '', body: ''});

  useEffect(() => {
    getPosts();
  }, []);

  const onPostChange = (e) => {
    const { id, value } = e.target;
    setValues({
      ...form,
      [id]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addPost(form);
    setModalOpen(false);
  };

  if (error) {
    return <ErrorIndicator />;
  }

  if (postsLoading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <div className="mt-4">
          <button
            className="btn btn-info"
            onClick={() => setModalOpen(true)}
          >
            Add new post
          </button>
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setModalOpen(false)}
          className="modal-post"
          overlayClassName="overlay"
          shouldCloseOnOverlayClick={true}
          closeTimeoutMS={300}
        >
          <PostForm
            form={form}
            onPostChange={onPostChange}
            setModalOpen={setModalOpen}
            onSubmit={onSubmit}
          />
        </Modal>

        <Route
          path='/posts'
          exact
          render={() =>
            <PostsList
              posts={posts}
              // users={users}
              // isLoggedIn={isLoggedIn}
              // authUsername={authUsername}
              // isNewPost={isNewPost}
              // setIsNewPost={setIsNewPost}
              // editedPost={editedPost}
              // setEditedPost={setEditedPost}
              // handlePostChange={handlePostChange}
              // createPost={createPost}
              // updatePost={updatePost}
              // deletePost={deletePost}
            />
          }
        />
        <Route
          path='/posts/:title'
          render={(props) =>  {
            const title = props.match.params.title;
            const selectedPost = posts.find(
              (post) => post.title === title,
            );
          return (
            <Post
              post={selectedPost}
              // author={author}
              // comments={selectedComments}
              // addComment={addComment}
              // handleCommentChange={handleCommentChange}
              // defaultName={commentName}
              // defaultBody={commentBody}
            />
          )}}
        />
      </Fragment>
    )
  }
};

const mapStateToProps = ({ posts: { posts, postsLoading, error, postUpdating }}) => {
  return { posts, postsLoading, error, postUpdating };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (post) => dispatch(addPost(post)),
    getPosts: () => dispatch(getPosts()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostsContainer);

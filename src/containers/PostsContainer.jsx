import React, { Fragment, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import PostsList from '../pages/Posts/PostsList/PostsList';
import Post from '../pages/Posts/Post/Post';
import PostForm from '../pages/Posts/PostForm/PostForm';
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
  username,
  posts,
  postsLoading,
  error,
  postUpdating,
  addPost,
  getPosts,
  updatePost,
  deletePost,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isNewPost, setIsNew] = useState(false);
  const [form, setValues] = useState({ title: '', body: '' });
  const [postId, setId] = useState(null);

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

  const onAddPost = () => {
    setIsNew(true);
    setValues({ title: '', body: '' });
    setModalOpen(true);
  };

  const onPostEdit = (id, post) => {
    setIsNew(false);
    setValues(post);
    setId(id);
    setModalOpen(true);
  };

  const onPostDelete = (id) => {
    deletePost(id);
  };

  const onPostSubmit = (e) => {
    e.preventDefault();
    //if its new post, then send add action else update action
    isNewPost ? addPost(form) : updatePost(postId, form);
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
        {isAuth
          // if user is logged in, then show button, else show text
          ? <AddPostBtn onAddPost={onAddPost} />
          : <div className="card shadow-sm mt-4">
              <div className="card-body">
                <h5 className="text-danger">Only registered users can add posts</h5>
              </div>
            </div>
        }

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
            isNewPost={isNewPost}
            onPostChange={onPostChange}
            setModalOpen={setModalOpen}
            onSubmit={onPostSubmit}
          />
        </Modal>

        <Route
          path="/posts"
          exact
          render={() => (
            <PostsList
              posts={posts}
              setModalOpen={setModalOpen}
              onPostEdit={onPostEdit}
              onPostDelete={onPostDelete}
              username={username}
            />
          )}
        />
        <Route
          path="/posts/:title"
          render={(props) => {
            const title = props.match.params.title;
            const selectedPost = posts.find((post) => post[1].title === title);
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
            );
          }}
        />
      </Fragment>
    );
  }
};

const mapStateToProps = ({
  auth: { token, username },
  posts: { posts, postsLoading, error, postUpdating },
}) => {
  return {
    isAuth: token !== null, username,
    posts, postsLoading, error, postUpdating
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => dispatch(getPosts()),
    addPost: (post) => dispatch(addPost(post)),
    updatePost: (id, post) => dispatch(updatePost(id, post)),
    deletePost: (id) => dispatch(deletePost(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostsContainer);

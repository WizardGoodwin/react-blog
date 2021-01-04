import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';

import PostsList from './PostsList';
import PostForm from './PostForm';
import Post from './Post';
import AddPostBtn from './AddPostBtn';
import Spinner from '../../shared/Spinner/Spinner';
import ErrorIndicator from '../../shared/ErrorIndicator/ErrorIndicator';
import {
  addPost,
  deletePost,
  getPosts,
  updatePost,
} from '../../store/actions/posts';
import { IPost } from '../../interfaces/post.interface';
import { IState } from '../../store/reducers';
import { isUserLoggedIn } from '../../shared/helpers';


//setting parent node for modal window
Modal.setAppElement('#root');

const Posts: FC = () => {
  const token = useSelector((state: IState) => state.auth.token);
  const username = useSelector((state: IState) => state.auth.username);
  const postsList = useSelector((state: IState) => state.posts.list);
  const postsLoading = useSelector((state: IState) => state.posts.postsLoading);
  const postsError = useSelector((state: IState) => state.posts.postsError);
  const dispatch = useDispatch();

  // state for handling modal windows
  const [isModalOpen, setModalOpen] = useState(false);
  // state for handling change of add new/edit post
  const [isNewPost, setIsNew] = useState(false);
  // state for handling adding post form
  const [postForm, setPostValues] = useState({ title: '', body: '' });
  // state for setting current post id
  const [postId, setId] = useState('');

  // fetching all posts from backend
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  // handling change of post form inputs
  const onPostChange = (e: ChangeEvent<HTMLInputElement>) => {
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
  const onPostEdit = (id: string, post: IPost) => {
    setIsNew(false);
    setPostValues(post);
    setId(id);
    setModalOpen(true);
  };

  // handling click on "delete" button
  const onPostDelete = (id: string) => {
    dispatch(deletePost(token, id));
  };

  // handling post form submit
  const onPostSubmit = (e: FormEvent) => {
    e.preventDefault();
    //if its new post, then send add action else update action
    isNewPost ? dispatch(addPost(token, postForm)) : dispatch(updatePost(token, postId, postForm));
    setModalOpen(false);
  };

  if (postsError) {
    return <ErrorIndicator />;
  }

  return postsLoading ? (
      <Spinner />
    ) : (
      <>
        <Route
          path="/posts"
          exact
          render={() => (
            <>
              {isUserLoggedIn() ? (
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
                posts={postsList}
                onPostEdit={onPostEdit}
                onPostDelete={onPostDelete}
                username={username}
              />
            </>
          )}
        />
        <Route
          path="/posts/:title"
          render={(props) => {
            const title = props.match.params.title;
            const selectedPost = postsList.find((post) => post[1].title === title);
            return selectedPost && <Post post={selectedPost} />;
          }}
        />
      </>
    );
};

export default Posts;

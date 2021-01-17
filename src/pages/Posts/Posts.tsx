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
import { isUserLoggedIn } from '../../shared/helpers';
import { selectAuthToken, selectUsername } from '../../store/selectors/auth';
import { selectPostsError, selectPostsList, selectPostsLoading } from '../../store/selectors/posts';


//setting parent node for modal window
Modal.setAppElement('#root');

const Posts: FC = () => {
  const token = useSelector(selectAuthToken);
  const username = useSelector(selectUsername);
  const postsList = useSelector(selectPostsList);
  const postsLoading = useSelector(selectPostsLoading);
  const postsError = useSelector(selectPostsError);
  const dispatch = useDispatch();

  const [isModalOpen, setModalOpen] = useState(false);
  const [isNewPost, setIsNew] = useState(false);
  const [postForm, setPostValues] = useState({ title: '', body: '' });
  const [postId, setId] = useState('');

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const onPostChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const onPostEdit = (id: string, post: IPost) => {
    setIsNew(false);
    setPostValues(post);
    setId(id);
    setModalOpen(true);
  };

  const onPostDelete = (id: string) => {
    dispatch(deletePost(token, id));
  };

  const onPostSubmit = (e: FormEvent) => {
    e.preventDefault();
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

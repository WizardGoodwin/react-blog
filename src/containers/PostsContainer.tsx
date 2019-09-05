import React, { ChangeEvent, FormEvent, Fragment, FunctionComponent, useEffect, useState } from 'react';
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
import { PostResponse } from '../interfaces/api-responses';
import { IPost } from '../interfaces/post.interface';
import { IState } from '../store/reducers';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { IAuthState } from '../store/reducers/auth';
import { IPostState } from '../store/reducers/posts';

//setting parent node for modal window
Modal.setAppElement('#root');

interface IProps {
  isAuth: boolean;
  token: string;
  username: string;
  posts: PostResponse[];
  postsLoading: boolean;
  postsError: string;
  addPost(token: string, post: IPost): any;
  getPosts(): any;
  updatePost(token: string, id: string, post: IPost): any;
  deletePost(token: string, id: string): any;
}

const PostsContainer: FunctionComponent<IProps> = ({
  isAuth,
  token,
  username,
  posts,
  postsLoading,
  postsError,
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
  const [postId, setId] = useState('');

  // fetching all posts from backend
  useEffect(() => {
    getPosts();
  }, []);

  // handling change of post form inputs
  const onPostChange = (e: ChangeEvent) => {
    const { id, value } = e.target as any;
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
    deletePost(token, id);
  };

  // handling post form submit
  const onPostSubmit = (e: FormEvent) => {
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
    // @ts-ignore
    // @ts-ignore
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
              // @ts-ignore
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

const mapStateToProps = (state: IState) => {
  const authState: IAuthState = state.auth;
  const postsState: IPostState = state.posts;
  return {
    isAuth: authState.token !== null,
    token: authState.token,
    username: authState.username,
    posts: postsState.posts,
    postsLoading: postsState.postsLoading,
    postsError: postsState.postsError
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getPosts: () => dispatch(getPosts()),
    addPost: (token: string, post: IPost) => dispatch(addPost(token, post)),
    updatePost: (token: string, id: string, post: IPost) => dispatch(updatePost(token, id, post)),
    deletePost: (token: string, id: string) => dispatch(deletePost(token, id)),
  };
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);

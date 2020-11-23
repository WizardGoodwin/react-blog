import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';

import LastPostsList from './LastPostsList/LastPostsList';
import Spinner from '../../shared/Spinner/Spinner';
import ErrorIndicator from '../../shared/ErrorIndicator/ErrorIndicator';
import { getLastPosts } from '../../store/actions/posts';
import { PostResponse } from '../../interfaces/api-responses';
import { IState } from '../../store/reducers';
import { IPostState } from '../../store/reducers/posts';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

interface IProps {
  posts: PostResponse[];
  postsLoading: boolean;
  error?: any;
  getLastPosts(): any;
}

const Sidebar: FunctionComponent<IProps> = ({ posts, postsLoading, error, getLastPosts }) => {
  // fetching latest posts from backend
  useEffect(() => {
    getLastPosts();
  }, [getLastPosts]);

  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <div className="d-none d-lg-block col-3">
      {postsLoading ? <Spinner /> : <LastPostsList postsList={posts} />}
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  const postsState: IPostState = state.posts;
  return { posts: postsState.posts, postsLoading: postsState.postsLoading, error: postsState.postsError };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getLastPosts: () => dispatch(getLastPosts()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);

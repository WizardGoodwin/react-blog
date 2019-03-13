import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import About from './About/About';
import LastPostsList from './LastPostsList/LastPostsList';
import Spinner from '../../shared/Spinner/Spinner';
import ErrorIndicator from '../../shared/ErrorIndicator/ErrorIndicator';
import { getLastPosts } from '../../store/actions/posts';

const Sidebar = ({ posts, postsLoading, error, getLastPosts }) => {

  useEffect(() => {
    getLastPosts();
  }, []);

  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <div className="col-3">
      { postsLoading
        ? <Spinner />
        : <LastPostsList
            postsList={posts}
          />
      }
      <About />
    </div>
  );
};

const mapStateToProps = ({ posts: { posts, postsLoading, error } }) => {
  return { posts, postsLoading, error };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLastPosts: () => dispatch(getLastPosts()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);

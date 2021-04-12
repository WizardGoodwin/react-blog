import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LastPostsList from './LastPostsList/LastPostsList';
import Spinner from '../../shared/Spinner/Spinner';
import ErrorIndicator from '../../shared/ErrorIndicator/ErrorIndicator';
import { selectPostsError, selectPostsLoading } from '../../store/selectors/posts';
import { getPosts } from '../../features/posts/postsSlice';


const Sidebar: FC = () => {
  const postsLoading = useSelector(selectPostsLoading);
  const error = useSelector(selectPostsError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <div className="d-none d-lg-block col-3">
      {postsLoading ? <Spinner /> : <LastPostsList />}
    </div>
  );
};

export default Sidebar;

import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LastPostsList from './LastPostsList/LastPostsList';
import Spinner from '../../shared/Spinner/Spinner';
import ErrorIndicator from '../../shared/ErrorIndicator/ErrorIndicator';
import { getLastPosts } from '../../store/actions/posts';
import { IState } from '../../store/reducers';


const Sidebar: FC = () => {
  const postsLoading = useSelector((state: IState) => state.posts.postsLoading);
  const error = useSelector((state: IState) => state.posts.postsError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLastPosts());
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

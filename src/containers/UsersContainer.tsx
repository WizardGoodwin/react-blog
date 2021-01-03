import React, { FC, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import User from '../pages/Users/User/User';
import UsersList from '../pages/Users/UsersList/UsersList';
import Spinner from '../shared/Spinner/Spinner';
import ErrorIndicator from '../shared/ErrorIndicator/ErrorIndicator';
import { getUsers } from '../store/actions/users';
import { IState } from '../store/reducers';

const UsersContainer: FC = () => {
  const token = useSelector((state: IState) => state.auth.token);
  const users = useSelector((state: IState) => state.users.users);
  const usersLoading = useSelector((state: IState) => state.users.usersLoading);
  const error = useSelector((state: IState) => state.users.error);
  const dispatch = useDispatch();

  // fetching all users from backend
  useEffect(() => {
    dispatch(getUsers(token));
  }, [dispatch, token]);

  if (error) {
    return <ErrorIndicator />;
  }

  return usersLoading ? (
    <Spinner />
  ): (
    <div>
      <Route path="/users" exact render={() => <UsersList users={users} />} />
      <Route
        path="/users/:username"
        render={(props) => {
          const username = props.match.params.username;
          const selectedUser = users.find(
            (user) => user.username === username,
          );
          return selectedUser && <User user={selectedUser} />;
        }}
      />
    </div>
  );
};

export default UsersContainer;

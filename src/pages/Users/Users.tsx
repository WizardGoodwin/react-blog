import React, { FC, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import User from './User';
import UsersList from './UsersList';
import Spinner from '../../shared/Spinner/Spinner';
import ErrorIndicator from '../../shared/ErrorIndicator/ErrorIndicator';
import { getUsers } from '../../store/actions/users';
import { IState } from '../../store/reducers';
import { isUserLoggedIn } from '../../shared/helpers';


const Users: FC = () => {
  const token = useSelector((state: IState) => state.auth.token);
  const usersList = useSelector((state: IState) => state.users.list);
  const usersLoading = useSelector((state: IState) => state.users.usersLoading);
  const error = useSelector((state: IState) => state.users.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isUserLoggedIn()) dispatch(getUsers(token));
  }, [dispatch, token]);

  if (error) {
    return <ErrorIndicator />;
  }

  return usersLoading ? (
    <Spinner />
  ) : (
    <div>
      <Route path="/users" exact render={() => <UsersList users={usersList} />} />
      <Route
        path="/users/:username"
        render={(props) => {
          const username = props.match.params.username;
          const selectedUser = usersList.find(
            (user) => user.username === username,
          );
          return selectedUser && <User user={selectedUser} />;
        }}
      />
    </div>
  );
};

export default Users;

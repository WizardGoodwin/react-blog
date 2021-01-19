import React, { FC, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import User from './User';
import UsersList from './UsersList';
import Spinner from '../../shared/Spinner/Spinner';
import ErrorIndicator from '../../shared/ErrorIndicator/ErrorIndicator';
import { selectAuthToken, selectIsUserLoggedIn } from '../../store/selectors/auth';
import { selectUsersError, selectUsersList, selectUsersLoading } from '../../store/selectors/users';
import { getUsers } from './usersSlice';
import { IUser } from '../../interfaces/user.interface';


const Users: FC = () => {
  const token = useSelector(selectAuthToken);
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);
  const usersList = useSelector(selectUsersList);
  const usersLoading = useSelector(selectUsersLoading);
  const error = useSelector(selectUsersError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isUserLoggedIn) dispatch(getUsers(token));
  }, [dispatch, token, isUserLoggedIn]);

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
            (user: IUser) => user.username === username,
          );
          return selectedUser && <User user={selectedUser} />;
        }}
      />
    </div>
  );
};

export default Users;

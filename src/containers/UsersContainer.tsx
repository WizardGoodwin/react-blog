import React, { FunctionComponent, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import User from '../pages/Users/User/User';
import UsersList from '../pages/Users/UsersList/UsersList';
import Spinner from '../shared/Spinner/Spinner';
import ErrorIndicator from '../shared/ErrorIndicator/ErrorIndicator';
import { getUsers } from '../store/actions/users';
import { IUser } from '../interfaces/user.interface';
import { IState } from '../store/reducers';
import { IAuthState } from '../store/reducers/auth';
import { IUserState } from '../store/reducers/users';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

interface IProps {
  token: string;
  error: string;
  usersLoading: boolean;
  users: IUser[];
  getUsers(token: string): any;
}

const UsersContainer: FunctionComponent<IProps> = ({ token, error, usersLoading, users, getUsers }) => {
  // fetching all users from backend
  useEffect(() => {
    getUsers(token);
  }, [getUsers, token]);

  if (error) {
    return <ErrorIndicator />;
  }

  if (usersLoading) {
    return <Spinner />;
  } else {
    return (
      <div>
        <Route path="/users" exact render={() => <UsersList users={users} />} />
        <Route
          path="/users/:username"
          render={(props) => {
            // extracting :username from path and finding user in the array
            const username = props.match.params.username;
            const selectedUser = users.find(
              (user) => user.username === username,
            );
            return selectedUser && <User user={selectedUser} />;
          }}
        />
      </div>
    );
  }
};

const mapStateToProps = (state: IState) => {
  const authState: IAuthState = state.auth;
  const userState: IUserState = state.users;
  return {
    token: authState.token,
    users: userState.users,
    usersLoading: userState.usersLoading,
    error: userState.error
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getUsers: (token: string) => dispatch(getUsers(token)),
  };
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps,)(UsersContainer);

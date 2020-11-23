import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import User from '../pages/Users/User/User';
import UsersList from '../pages/Users/UsersList/UsersList';
import Spinner from '../shared/Spinner/Spinner';
import ErrorIndicator from '../shared/ErrorIndicator/ErrorIndicator';
import { getUsers } from '../store/actions/users';

const UsersContainer = ({ token, error, usersLoading, users, getUsers }) => {
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
            return <User user={selectedUser} />;
          }}
        />
      </div>
    );
  }
};

const mapStateToProps = ({
  auth: { token },
  users: { users, usersLoading, error },
}) => {
  return { token, users, usersLoading, error };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: (token) => dispatch(getUsers(token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersContainer);

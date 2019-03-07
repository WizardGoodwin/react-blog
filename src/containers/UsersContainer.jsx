import React, {useEffect} from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import User from '../pages/Users/User/User';
import UsersList from '../pages/Users/UsersList/UsersList';
import Spinner from '../shared/Spinner/Spinner';
import ErrorIndicator from '../shared/ErrorIndicator/ErrorIndicator';
import { getUsers } from '../store/actions/users';

const UsersContainer = ({ error, loading, users, getUsers }) => {

  useEffect(() => {
    getUsers();
  }, []);

  if (error) {
    return (
      <ErrorIndicator/>
    );
  }

  if (loading) {
    // если пользователи загружаются
    return <Spinner/>
  } else {
    return (
      <div>
        <Route
          path="/users"
          exact
          render={() => <UsersList users={users} />}
        />
        <Route
          path="/users/:username"
          render={(props) => {
            const username = props.match.params.username;
            const selectedUser = users.find(
              (user) => user.username === username,
            );
            return <User user={selectedUser} />;
          }}
        />
      </div>
    )
  }


};

//привязываем состояние из store к this.props
const mapStateToProps = ({users: { users, loading, error }}) => {
  return {users, loading, error};
};

//привязываем функцию из actions к this.props
const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => dispatch(getUsers()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersContainer);

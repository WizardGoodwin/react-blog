import React from 'react';
import { connect } from 'react-redux';

import Brand from './Brand/Brand';
import Navigation from './Navigation/Navigation';
import SignButtons from './SignButtons/SignButtons';
import UserButton from './UserButton/UserButton';
import { logOut } from '../../store/actions/auth';

const Header = ({ isAuth, username, onLogOut }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark shadow">
      <div className="container">
        <Brand />
        <Navigation />
        {isAuth
          ? <UserButton
            onLogOut={onLogOut}
            username={username}
          />
          : <SignButtons />
        }
      </div>
    </nav>
  );
};

const mapStateToProps = ({ auth: { token, username } }) => {
  return {
    isAuth: token !== null,
    username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogOut: () => dispatch(logOut()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

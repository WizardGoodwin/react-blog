import React from 'react';
import { connect } from 'react-redux';

import Brand from './Brand/Brand';
import Navigation from './Navigation/Navigation';
import SignButtons from './SignButtons/SignButtons';
import UserButton from './UserButton/UserButton';
import * as actions from '../../store/actions/auth';

const Header = ({isAuth, userId, onLogOut}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">
        <Brand />
        <Navigation />
        { isAuth ? <UserButton userId={userId} onLogOut={onLogOut} /> : <SignButtons /> }
      </div>
    </nav>
  );
};

const mapStateToProps = ({auth: { token, userId }}) => {
  return {
    isAuth: token !== null,
    userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogOut: () => dispatch(actions.logOut()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

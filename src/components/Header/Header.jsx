import React from 'react';
import { connect } from 'react-redux';

import Brand from './Brand/Brand';
import Navigation from './Navigation/Navigation';
import SignButtons from './SignButtons/SignButtons';
import LogOutButton from './LogOutButton/LogOutButton';
import * as actions from '../../store/actions/auth';

const Header = ({isAuthenticated, onLogOut}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">
        <Brand />
        <Navigation />
        { isAuthenticated ? <LogOutButton onLogOut={onLogOut} /> : <SignButtons /> }
      </div>
    </nav>
  );
};

const mapStateToProps = ({auth: { token }}) => {
  return {
    isAuthenticated: token !== null,
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

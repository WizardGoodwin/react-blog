import React, { useState } from 'react';
import { connect } from 'react-redux';

import Brand from './Brand/Brand';
import Navigation from './Navigation/Navigation';
import SignButtons from './SignButtons/SignButtons';
import UserButton from './UserButton/UserButton';
import { logOut } from '../../store/actions/auth';
import MobileMenu from './MobileMenu/MobileMenu';

const Header = ({ isAuth, username, onLogOut }) => {
  //state for handling hamburger menu opening
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow">
      <div className="container">
        <button className="navbar-toggler" onClick={() => toggleMenu()}>
          <span className="navbar-toggler-icon" />
        </button>
        <Brand />
        <div className="collapse navbar-collapse">
          <Navigation />
          {/*if user is authenticated, then show username and log out button, else sign buttons*/}
          { isAuth ? (
            <UserButton onLogOut={onLogOut} username={username} />
          ) : (
            <SignButtons />
          )}
        </div>
      </div>

      {isMenuOpen && (
        <MobileMenu setMenuOpen={setMenuOpen}>
          <Navigation />
          {isAuth ? (
            <UserButton onLogOut={onLogOut} username={username} />
          ) : (
            <SignButtons />
          )}
        </MobileMenu>
      )}
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

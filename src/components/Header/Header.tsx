import React, { FunctionComponent, useState } from 'react';
import { connect } from 'react-redux';

import Brand from './Brand/Brand';
import Navigation from './Navigation/Navigation';
import SignButtons from './SignButtons/SignButtons';
import UserButton from './UserButton/UserButton';
import { logOut } from '../../store/actions/auth';
import MobileMenu from './MobileMenu/MobileMenu';
import { IState } from '../../store/reducers';
import { IAuthState } from '../../store/reducers/auth';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

interface IProps {
  isAuth: boolean;
  username: string;
  onLogOut(): any;
}

const Header: FunctionComponent<IProps> = ({ isAuth, username, onLogOut }) => {
  //state for handling hamburger menu opening
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  // @ts-ignore
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
          {isAuth ? (
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

const mapStateToProps = (state: IState) => {
  const authState: IAuthState =  state.auth;
  return {
    isAuth: authState.token !== null,
    username: authState.username,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    onLogOut: () => dispatch(logOut()),
  };
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Header);

import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';

import Brand from './Brand/Brand';
import Navigation from './Navigation/Navigation';
import SignButtons from './SignButtons/SignButtons';
import UserButton from './UserButton/UserButton';
import MobileMenu from './MobileMenu/MobileMenu';
import { selectIsUserLoggedIn } from '../../store/selectors/auth';


const Header: FC = () => {
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

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
          {isUserLoggedIn ? (
            <UserButton />
          ) : (
            <SignButtons />
          )}
        </div>
      </div>

      {isMenuOpen && (
        <MobileMenu setMenuOpen={setMenuOpen}>
          <Navigation />
          {isUserLoggedIn ? (
            <UserButton />
          ) : (
            <SignButtons />
          )}
        </MobileMenu>
      )}
    </nav>
  );
};

export default Header;

import React from 'react';
import Brand from './Brand/Brand';
import Navigation from './Navigation/Navigation';
import SignButtons from './SignButtons/SignButtons';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">
        <Brand />
        <Navigation />
        <SignButtons />
      </div>
    </nav>
  );
};

export default Header;

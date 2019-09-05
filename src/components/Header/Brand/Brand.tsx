import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

const Brand: FunctionComponent = () => {
  return (
    <Link to={'/'} className="navbar-brand text-white">
      React Blog
    </Link>
  );
};

export default Brand;

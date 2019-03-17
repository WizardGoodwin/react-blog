import React from 'react';
import { Link } from 'react-router-dom';

const ErrorIndicator = () => {
  return (
    <div className="container pt-5">
      <h1 className="mt-5 text-center">It seems something went wrong</h1>
      <p className="mt-3 text-center">Try to reload page or go to main page</p>
      <Link className="mt-3 text-center" to="/">
        <p className="text-center">Go to main page</p>
      </Link>
    </div>
  );
};

export default ErrorIndicator;

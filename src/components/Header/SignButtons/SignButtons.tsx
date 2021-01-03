import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const SignButtons: FC = () => {
  return (
    <div className="d-md-flex">
      <div>
        <Link to="/sign-up" className="btn btn-outline-info my-2 mr-3">
          Sign up
        </Link>
      </div>
      <div>
        <Link to="/sign-in" className="btn btn-outline-info my-2 mr-3 ml-lg-4">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignButtons;

import React from 'react';
import { Link } from 'react-router-dom';

const SignButtons = () => {

  return (
    <div>
      {/*<button*/}
        {/*className="btn btn-outline-info my-2"*/}
      {/*>*/}
        {/*Sign up*/}
      {/*</button>*/}
      <Link
        to='/sign-up'
        className="btn btn-outline-info my-2"
      >
        Sign up
      </Link>
      <Link
        to='/sign-in'
        className="btn btn-outline-info my-2 ml-4"
      >
        Sign in
      </Link>
    </div>
  )
};

export default SignButtons;
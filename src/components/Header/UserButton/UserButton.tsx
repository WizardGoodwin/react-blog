import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectUsername } from '../../../store/selectors/auth';
import { userLogOut } from '../../../features/auth/authSlice';


const UserButton: FC = () => {
  const username = useSelector(selectUsername);
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(userLogOut());

  return (
    <div className="d-md-flex align-items-center">
      <div>
        <Link to="/profile" className="text-white mb-0 mr-3">
          {username}
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className="btn btn-outline-info my-4 my-md-2"
      >
        Log Out
      </button>
    </div>
  );
};

export default UserButton;

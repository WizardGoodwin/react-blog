import React from 'react';
import { Link } from 'react-router-dom';

const UserButton = ({ username, onLogOut }) => {
  return (
    <div className="d-md-flex align-items-center">
      <div>
        <Link to="/profile" className="text-white mb-0 mr-3">
          {username}
        </Link>
      </div>
      <button onClick={() => onLogOut()} className="btn btn-outline-info my-4 my-md-2">
        Log Out
      </button>
    </div>
  );
};

export default UserButton;

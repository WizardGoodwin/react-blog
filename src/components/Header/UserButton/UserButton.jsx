import React from 'react';
import { Link } from 'react-router-dom';

const UserButton = ({ userId, onLogOut }) => {
  return (
    <div className="d-flex align-items-center">
      <Link to="/" className="text-white mb-0 mr-3">
        {userId}
      </Link>
      <button onClick={() => onLogOut()} className="btn btn-outline-info my-2">
        Log Out
      </button>
    </div>
  );
};

export default UserButton;

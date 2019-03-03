import React from 'react';

const LogOutButton = ({onLogOut}) => {
  return (
    <div>
      <button onClick={() => onLogOut()} className="btn btn-outline-info my-2">
        Log Out
      </button>
    </div>
  );
};

export default LogOutButton;
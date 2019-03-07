import React from 'react';
import { Link } from 'react-router-dom';

const UsersList = ({ users }) => {
  return users.map((user) => {
    return (
      <div key={user.id} className="card shadow-sm my-4">
        <h5 className="card-header">
          <Link to={'/users/' + user.username} className="card-link">
            {user.username}
          </Link>
        </h5>
        <div className="card-body">
          <p className="card-text">Full name: {user.name}</p>
          <p className="card-text">E-mail: {user.email}</p>
          <p className="card-text">Phone: {user.phone}</p>
        </div>
      </div>
    );
  });
};

export default UsersList;

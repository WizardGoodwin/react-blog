import React from 'react';
import { Link } from 'react-router-dom';

const User = ({ user }) => {
  return (
    <div className="card shadow-sm my-4">
      <h5 className="card-header">{user.username}</h5>
      <div className="card-body">
        <p className="card-text">Full name: {user.name}</p>
        <p className="card-text">E-mail: {user.email}</p>
        <p className="card-text">Phone: {user.phone}</p>
        <p className="card-text">Address: {user.address}</p>
        <p className="card-text">Website: {user.website}</p>
      </div>
      <div className="card-footer">
        <Link to={'/users'} className="card-link">
          Перейти к списку пользователей
        </Link>
      </div>
    </div>
  );
};

export default User;

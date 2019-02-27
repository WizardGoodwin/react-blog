import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link className="nav-link" to='/posts'>Posts</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to='/users'>Users</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to='/comments'>Comments</Link>
      </li>
    </ul>
  )
};

export default Navigation;
import React, { Fragment, FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../../../interfaces/user.interface';

interface IProps {
  users: IUser[]
}

const UsersList: FunctionComponent<IProps> = ({ users }) => {
  return (
    <Fragment>
      <h2 className="mt-4 text-info">Registered users</h2>
      {users.map((user: IUser) => {
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
      })}
    </Fragment>
  );
};

export default UsersList;

import React, { ChangeEvent, FormEvent, FC } from 'react';

import Spinner from '../../shared/Spinner/Spinner';

interface IProps {
  form: IProfileForm;
  onProfileChange(e: ChangeEvent): void;
  onSubmit(e: FormEvent): void;
  userUpdating?: boolean;
}

interface IProfileForm {
  username: string;
  email: string;
  name?: string;
  phone?: string;
  address?: string;
  website?: string;
}

const ProfileForm: FC<IProps> = ({ form, onProfileChange, onSubmit, userUpdating }) => {
  const { username, email, name, phone, address, website } = form;
  return (
    <div className="card mt-4">
      <div className="card-header">Profile</div>
      <div className="card-body">
        <form onSubmit={(e: FormEvent) => onSubmit(e)}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                placeholder="Enter your username"
                onChange={(e: ChangeEvent) => onProfileChange(e)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="name">Full name: </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              placeholder="Enter your full name"
              onChange={(e: ChangeEvent) => onProfileChange(e)}
            />
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="email">E-mail: </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                placeholder="Enter your E-mail"
                onChange={(e: ChangeEvent) => onProfileChange(e)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="phone">Phone: </label>
              <input
                type="phone"
                className="form-control"
                id="phone"
                value={phone}
                placeholder="Enter your phone"
                onChange={(e: ChangeEvent) => onProfileChange(e)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="address">Address: </label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={address}
                placeholder="Enter your address"
                onChange={(e: ChangeEvent) => onProfileChange(e)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="website">Website: </label>
              <input
                type="text"
                className="form-control"
                id="website"
                value={website}
                placeholder="Enter your website url"
                onChange={(e: ChangeEvent) => onProfileChange(e)}
              />
            </div>
          </div>
          {userUpdating ? (
            <Spinner />
          ) : (
            <button className="btn btn-success" type="submit">
              Save changes
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;

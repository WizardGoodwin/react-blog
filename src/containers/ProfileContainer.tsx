import React, { ChangeEvent, FormEvent, FunctionComponent, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { getUserById, updateUser } from '../store/actions/users';
import ErrorIndicator from '../shared/ErrorIndicator/ErrorIndicator';
import Spinner from '../shared/Spinner/Spinner';
import ProfileForm from '../components/ProfileForm/ProfileForm';
import { IUser } from '../interfaces/user.interface';
import { IState } from '../store/reducers';
import { IUserState } from '../store/reducers/users';
import { IAuthState } from '../store/reducers/auth';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

interface IProps {
  isAuth: boolean;
  token: string;
  user: IUser;
  error: string;
  userLoading: boolean;
  userUpdating: boolean;
  getUserById(token: string): any;
  updateUser(token: string, user: IUser): any;
}

const ProfileContainer: FunctionComponent<IProps> = (props) => {
  const {
    isAuth,
    token,
    user,
    error,
    userLoading,
    userUpdating,
    getUserById,
    updateUser,
  } = props;

  // state for handling profile form
  const [form, setValues] = useState(user);

  // fetching user info by id from backend
  useEffect(() => {
    getUserById(token);
    setValues(user);
  }, [Object.keys(user).length]);

  // handling change of profile form inputs
  const onProfileChange = (e: ChangeEvent) => {
    const { id, value } = e.target as any;
    setValues({
      ...form,
      [id]: value,
    });
  };

  // handling profile form submit
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateUser(token, form);
  };

  // if user is not authenticated, then redirect to main page
  if (!isAuth) {
    return <Redirect to="/" />;
  }

  if (error) {
    return <ErrorIndicator />;
  }

  if (userLoading) {
    // если пользователи загружаются
    return <Spinner />;
  } else {
    return (
      <ProfileForm
        form={form}
        onProfileChange={onProfileChange}
        onSubmit={onSubmit}
        userUpdating={userUpdating}
      />
    );
  }
};

const mapStateToProps = (state: IState) => {
  const authState: IAuthState = state.auth;
  const userState: IUserState = state.users;
  return {
    isAuth: authState.token !== null,
    token: authState.token,
    user: userState.user,
    error: userState.error,
    userLoading: userState.userLoading,
    userUpdating: userState.userUpdating,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getUserById: (token: string) => dispatch(getUserById(token)),
    updateUser: (token: string, user: IUser) => dispatch(updateUser(token, user)),
  };
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);

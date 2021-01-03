import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getUserById, updateUser } from '../store/actions/users';
import ErrorIndicator from '../shared/ErrorIndicator/ErrorIndicator';
import Spinner from '../shared/Spinner/Spinner';
import ProfileForm from '../components/ProfileForm/ProfileForm';
import { IState } from '../store/reducers';

const ProfileContainer: FC = () => {
  const isAuth = useSelector((state: IState) => state.auth.token.length > 0);
  const token = useSelector((state: IState) => state.auth.token);
  const user = useSelector((state: IState) => state.users.user);
  const userLoading = useSelector((state: IState) => state.users.userLoading);
  const userUpdating = useSelector((state: IState) => state.users.userUpdating);
  const error = useSelector((state: IState) => state.users.error);
  const dispatch = useDispatch();

  // state for handling profile form
  const [form, setValues] = useState(user);

  // fetching user info by id from backend
  useEffect(() => {
    dispatch(getUserById(token));
    setValues(user);
  // eslint-disable-next-line
  }, [dispatch, token, user.id]);

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

  return userLoading ? (
    <Spinner />
  ): (
    <ProfileForm
      form={form}
      onProfileChange={onProfileChange}
      onSubmit={onSubmit}
      userUpdating={userUpdating}
    />
  );
};

export default ProfileContainer;

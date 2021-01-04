import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserById, updateUser } from '../../store/actions/users';
import ErrorIndicator from '../../shared/ErrorIndicator/ErrorIndicator';
import Spinner from '../../shared/Spinner/Spinner';
import ProfileForm from './ProfileForm';
import { IState } from '../../store/reducers';


const Profile: FC = () => {
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
  const onProfileChange = (e: ChangeEvent<HTMLInputElement >) => {
    const { id, value } = e.target;
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

export default Profile;

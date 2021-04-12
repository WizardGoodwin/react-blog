import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ErrorIndicator from '../../shared/ErrorIndicator/ErrorIndicator';
import Spinner from '../../shared/Spinner/Spinner';
import ProfileForm from './ProfileForm';
import { selectAuthToken } from '../../store/selectors/auth';
import {
  selectUser,
  selectUsersError,
  selectUsersLoading,
  selectUserUpdating,
} from '../../store/selectors/users';
import { getUserById, updateUser } from './usersSlice';


const Profile: FC = () => {
  const token = useSelector(selectAuthToken);
  const user = useSelector(selectUser);
  const userLoading = useSelector(selectUsersLoading);
  const userUpdating = useSelector(selectUserUpdating);
  const error = useSelector(selectUsersError);
  const dispatch = useDispatch();

  const [form, setValues] = useState(user);

  const onProfileChange = (e: ChangeEvent<HTMLInputElement >) => {
    const { id, value } = e.target;
    setValues({
      ...form,
      [id]: value,
    });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(updateUser({ token, user: form }));
  };

  useEffect(() => {
    dispatch(getUserById(token));
    setValues(user);
    // eslint-disable-next-line
  }, [dispatch, token, user.id]);

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

import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { getUserById, updateUser } from '../store/actions/users';
import ErrorIndicator from '../shared/ErrorIndicator/ErrorIndicator';
import Spinner from '../shared/Spinner/Spinner';
import ProfileForm from '../components/ProfileForm/ProfileForm';

const ProfileContainer = (props) => {
  const {
    isAuth,
    user,
    error,
    userLoading,
    userUpdating,
    getUserById,
    updateUser,
  } = props;

  const [form, setValues] = useState(user);

  const onProfileChange = (e) => {
    const { id, value } = e.target;
    setValues({
      ...form,
      [id]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateUser(form);
  };

  useEffect(() => {
    getUserById();
    setValues(user);
  }, [Object.keys(user).length]);

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

const mapStateToProps = ({
  auth: { token },
  users: { user, error, userLoading, userUpdating },
}) => {
  return {
    isAuth: token !== null,
    user,
    error,
    userLoading,
    userUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserById: () => dispatch(getUserById()),
    updateUser: (user) => dispatch(updateUser(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileContainer);

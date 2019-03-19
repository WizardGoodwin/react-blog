import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import SignUpForm from '../components/Auth/SignUpForm/SignUpForm';
import { signUp } from '../store/actions/auth';

// validation schema
const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username should consist of no less than 3 symbols')
    .required('This field should be filled'),
  email: Yup.string()
    .email('Incorrect email format')
    .required('This field should be filled'),
  password: Yup.string()
    .min(8, 'Password should consist of no less than 8 symbols')
    .required('This field should be filled'),
});

const SignUpContainer = ({ loading, error, isAuth, onSignUp }) => {
  // handling sign up form submit
  const onSubmit = (values, actions) => {
    onSignUp(values);
    actions.setSubmitting(false);
  };

  const renderForm = ({ errors, touched }) => {
    return (
      <SignUpForm
        errors={errors}
        touched={touched}
        error={error}
        loading={loading}
      />
    );
  };

  // if user is logged in already, then redirect to profile
  if (isAuth) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className="container card w-75 mt-5 p-4 shadow">
      <h3 className="text-center">Sign up</h3>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        onSubmit={(values, actions) => onSubmit(values, actions)}
        validationSchema={SignUpSchema}
        render={(formProps) => renderForm(formProps)}
      />
    </div>
  );
};

const mapStateToProps = ({ auth: { loading, error, token } }) => {
  return {
    loading,
    error,
    isAuth: token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUp: (authData) => dispatch(signUp(authData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpContainer);

import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import SignInForm from '../components/Auth/SignInForm/SignInForm';
import { signIn } from '../store/actions/auth';

const SignInSchema = Yup.object().shape({
  email: Yup.string().required('This field should be filled'),
  password: Yup.string().required('This field should be filled'),
});

const SignInContainer = ({ loading, error, isAuth, onSignIn }) => {
  const onSubmit = (values, actions) => {
    onSignIn(values);
    actions.setSubmitting(false);
  };

  const renderForm = ({ errors, touched }) => {
    return (
      <SignInForm
        errors={errors}
        touched={touched}
        error={error}
        loading={loading}
      />
    );
  };

  if (isAuth) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className="container card w-75 mt-5 p-4 shadow">
      <h3 className="text-center">Sign in</h3>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, actions) => onSubmit(values, actions)}
        validationSchema={SignInSchema}
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
    onSignIn: (authData) => dispatch(signIn(authData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInContainer);

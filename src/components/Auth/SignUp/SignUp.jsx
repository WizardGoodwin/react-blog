import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Spinner from '../../../shared/Spinner/Spinner';
import { signUp } from '../../../store/actions/auth';

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

const SignUp = ({ loading, error, isAuth, onSignUp }) => {
  const onSubmit = (values, actions) => {
    onSignUp(values);
    actions.setSubmitting(false);
  };

  const renderForm = ({ errors, touched }) => {
    return (
      <Form className="d-flex flex-column align-items-center">
        <div className="form-group w-75">
          <label htmlFor="username">Username</label>
          <Field
            id="username"
            type="text"
            name="username"
            placeholder="Enter your username"
            className={
              touched.username
                ? errors.username || error
                  ? 'form-control is-invalid'
                  : 'form-control is-valid'
                : 'form-control '
            }
          />
          <ErrorMessage
            name="username"
            component="div"
            className="text-danger"
          />
        </div>

        <div className="form-group w-75">
          <label htmlFor="email">Email</label>
          <Field
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            className={
              touched.email
                ? errors.email || error
                  ? 'form-control is-invalid'
                  : 'form-control is-valid'
                : 'form-control '
            }
          />
          <ErrorMessage name="email" component="div" className="text-danger" />
        </div>

        <div className="form-group w-75">
          <label htmlFor="password">Password</label>
          <Field
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            className={
              touched.password
                ? errors.password || error
                  ? 'form-control is-invalid'
                  : 'form-control is-valid'
                : 'form-control '
            }
          />
          <ErrorMessage
            name="password"
            component="div"
            className="text-danger"
          />
        </div>

        {error && <div className="text-danger mb-3">{error.message}</div>}

        {loading ? (
          <Spinner />
        ) : (
          <button
            className="btn btn-success"
            type="submit"
            disabled={
              !touched.email ||
              !touched.password ||
              !touched.username ||
              Object.keys(errors).length !== 0
            }
          >
            Sign up
          </button>
        )}
      </Form>
    );
  };

  if (isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container card w-75 mt-5 p-4 shadow">
      <h3 className="text-center">Sign up</h3>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        onSubmit={(values, actions) => {
          onSubmit(values, actions);
        }}
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
)(SignUp);

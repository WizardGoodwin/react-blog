import React from 'react';
import { Form, Field, ErrorMessage } from 'formik';

import Spinner from '../../../shared/Spinner/Spinner';

const SignInForm = ({ errors, touched, error, loading }) => {
  return (
    <Form className="d-flex flex-column align-items-center">
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
              : 'form-control'
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
        <ErrorMessage name="password" component="div" className="text-danger" />
      </div>

      {/*outputting async validation error*/}
      {error && <div className="text-danger mb-3">{error.message}</div>}

      {loading ? (
        <Spinner />
      ) : (
        <button className="btn btn-success" type="submit">
          Sign in
        </button>
      )}
    </Form>
  );
};

export default SignInForm;
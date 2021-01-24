import React, { FC } from 'react';
import { Form, Field, ErrorMessage, FormikErrors, FormikTouched } from 'formik';

import { ISignUpForm } from './SignUp';
import ButtonSpinner from '../../shared/Spinner/ButtonSpinner';


interface IProps {
  errors: FormikErrors<ISignUpForm>;
  touched: FormikTouched<ISignUpForm>;
  error: string | null;
  loading: boolean;
}

const SignInForm: FC<IProps> = ({ errors, touched, error, loading }) => {
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
        <ErrorMessage name="username" component="div" className="text-danger" />
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
        <ErrorMessage name="password" component="div" className="text-danger" />
      </div>

      {error && <div className="text-danger mb-3">{error}</div>}

      {loading ? (
        <ButtonSpinner />
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

export default SignInForm;

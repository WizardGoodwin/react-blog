import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import SignInForm from '../components/Auth/SignInForm/SignInForm';
import { signIn } from '../store/actions/auth';
import { IState } from '../store/reducers';

// validation schema
const SignInSchema = Yup.object().shape({
  email: Yup.string().required('This field should be filled'),
  password: Yup.string().required('This field should be filled'),
});

const SignInContainer: FC = () => {
  const isAuth = useSelector((state: IState) => state.auth.token.length > 0);
  const loading = useSelector((state: IState) => state.auth.loading);
  const error = useSelector((state: IState) => state.auth.error);
  const dispatch = useDispatch();

  const onSubmit = (values: any, actions: any) => {
    dispatch(signIn(values));
    actions.setSubmitting(false);
  };

  const renderForm = (formProps: any) => {
    return (
      <SignInForm
        errors={formProps.errors}
        touched={formProps.touched}
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

export default SignInContainer;

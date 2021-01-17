import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';

import SignInForm from './SignInForm';
import { signIn } from '../../store/actions/auth';
import { isUserLoggedIn } from '../../shared/helpers';
import { selectAuthError, selectAuthLoading } from '../../store/selectors/auth';


export interface ISignInForm {
  email: string;
  password: string;
}

// validation schema
const SignInSchema = Yup.object().shape({
  email: Yup.string().required('This field should be filled'),
  password: Yup.string().required('This field should be filled'),
});

const SignIn: FC = () => {
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const dispatch = useDispatch();

  const onSubmit = (values: ISignInForm, actions: FormikHelpers<ISignInForm>) => {
    dispatch(signIn(values));
    actions.setSubmitting(false);
  };

  // if user is logged in already, then redirect to profile
  if (isUserLoggedIn()) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className="container card w-75 mt-5 p-4 shadow">
      <h3 className="text-center">Sign in</h3>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values: ISignInForm, actions: FormikHelpers<ISignInForm>) => onSubmit(values, actions)}
        validationSchema={SignInSchema}
      >
        {(formProps: FormikProps<ISignInForm>) => (
          <SignInForm
            errors={formProps.errors}
            touched={formProps.touched}
            error={error}
            loading={loading}
          />
        )}
      </Formik>
    </div>
  );
};

export default SignIn;

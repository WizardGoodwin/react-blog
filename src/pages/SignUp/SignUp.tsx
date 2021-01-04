import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';

import SignUpForm from './SignUpForm';
import { signUp } from '../../store/actions/auth';
import { IState } from '../../store/reducers';
import { isUserLoggedIn } from '../../shared/helpers';


export interface ISignUpForm {
  email: string;
  password: string;
  username: string;
}

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

const SignUp: FC = () => {
  const loading = useSelector((state: IState) => state.auth.loading);
  const error = useSelector((state: IState) => state.auth.error);
  const dispatch = useDispatch();

  const onSubmit = (values: ISignUpForm, actions: FormikHelpers<ISignUpForm>) => {
    dispatch(signUp(values));
    actions.setSubmitting(false);
  };

  // if user is logged in already, then redirect to profile
  if (isUserLoggedIn()) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className="container card w-75 mt-5 p-4 shadow">
      <h3 className="text-center">Sign up</h3>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        onSubmit={(values: ISignUpForm, actions: FormikHelpers<ISignUpForm>) => onSubmit(values, actions)}
        validationSchema={SignUpSchema}
      >
        {(formProps: FormikProps<ISignUpForm>) => (
          <SignUpForm
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

export default SignUp;

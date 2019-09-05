import React, { FunctionComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import SignUpForm from '../components/Auth/SignUpForm/SignUpForm';
import { signUp } from '../store/actions/auth';
import { IState } from '../store/reducers';
import { IAuthState } from '../store/reducers/auth';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

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

interface IProps {
  loading: boolean;
  error: string;
  isAuth: boolean;
  onSignUp(value: any): any;
}

const SignUpContainer: FunctionComponent<IProps> = ({ loading, error, isAuth, onSignUp }) => {
  // handling sign up form submit
  const onSubmit = (values: any, actions: any) => {
    onSignUp(values);
    actions.setSubmitting(false);
  };

  const renderForm = (formProps: any) => {
    return (
      <SignUpForm
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

const mapStateToProps = (state: IState) => {
  const authState: IAuthState = state.auth;
  return {
    loading: authState.loading,
    error: authState.error,
    isAuth: authState.token !== null,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    onSignUp: (authData: any) => dispatch(signUp(authData)),
  };
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps,)(SignUpContainer);

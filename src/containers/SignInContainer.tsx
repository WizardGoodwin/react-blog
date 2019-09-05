import React, { FunctionComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik } from 'formik';
// @ts-ignore
import * as Yup from 'yup';

import SignInForm from '../components/Auth/SignInForm/SignInForm';
import { signIn } from '../store/actions/auth';
import { IState } from '../store/reducers';
import { IAuthState } from '../store/reducers/auth';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

// validation schema
const SignInSchema = Yup.object().shape({
  email: Yup.string().required('This field should be filled'),
  password: Yup.string().required('This field should be filled'),
});

interface IProps {
  loading: boolean;
  error: string;
  isAuth: boolean;
  onSignIn(value: any): any;
}

const SignInContainer: FunctionComponent<IProps> = ({ loading, error, isAuth, onSignIn }) => {
  // handling sign in form submit
  const onSubmit = (values: any, actions: any) => {
    onSignIn(values);
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
    onSignIn: (authData: any) => dispatch(signIn(authData)),
  };
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps,)(SignInContainer);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Spinner from '../../../shared/Spinner/Spinner';
import * as actions from '../../../store/actions/auth';

class SignIn extends Component {
  SignUpSchema = Yup.object().shape({
    email: Yup.string()
      .email('Incorrect email format')
      .required('This field should be filled'),
    password: Yup.string()
      .min(8, 'Password should consist of no less than 8 symbols')
      .required('This field should be filled'),
  });

  onSubmit = (values, actions) => {
    this.props.onSignIn(values.email, values.password);
    actions.setSubmitting(false);
  };

  renderForm = ({errors, touched}) => {
    const {loading, error}  = this.props;
    return (
      <Form className="d-flex flex-column align-items-center">
        <div className="form-group w-75">
          <label htmlFor="email">Email</label>
          <Field
            id="email"
            type="email"
            name="email"
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

        { error &&
        <div className="text-danger mb-3">
          {error.message}
        </div>
        }

        { loading ?
          <Spinner/>
          :
          <button
            className="btn btn-success"
            type="submit"
            disabled={
              !touched.email || !touched.password || Object.keys(errors).length !== 0
            }
          >
            Sign in
          </button>
        }
      </Form>
    );
  };

  render() {
    return (
      <div className="container card w-75 mt-5 p-4 shadow">
        <h3 className="text-center">Sign in</h3>
        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={(values, actions) => {this.onSubmit(values, actions)}}
          validationSchema={this.SignUpSchema}
          render={(formProps) => this.renderForm(formProps)}
        />
      </div>
    );
  }
}

const mapStateToProps = ({auth: { loading, error, token, authRedirectPath }}) => {
  return {
    loading,
    error,
    isAuthenticated: token !== null,
    authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignIn: (email, password) => dispatch(actions.signIn(email, password)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);

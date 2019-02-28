import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Spinner from '../../../shared/Spinner/Spinner';
import * as actions from '../../../store/actions/auth';



class SignUp extends Component {

  SignUpSchema = Yup.object().shape({
    email: Yup.string()
      .email('Incorrect email format')
      .required('This field should be filled'),
    password: Yup.string()
      .min(8, 'Password should consist of no less than 8 symbols')
      .required('This field should be filled'),
  });

  onSubmit = (values, actions) => {
    this.props.onAuth(values.email, values.password);
    actions.setSubmitting(false);
  }

  renderForm = (props) => {
    const { errors, touched, isSubmitting } = props;
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
                ? errors.email
                ? 'form-control is-invalid'
                : 'form-control is-valid'
                : 'form-control '
            }
          />
          <ErrorMessage
            name="email"
            component="div"
            className="text-danger"
          />
        </div>

        <div className="form-group w-75">
          <label htmlFor="password">Password</label>
          <Field
            id="password"
            type="password"
            name="password"
            className={
              touched.password
                ? errors.password
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

        <button
          className="btn btn-success"
          type="submit"
          disabled={isSubmitting}
        >
          Sign up
        </button>
      </Form>
    )
  };

  render() {
    if ( this.props.loading ) {
      return <Spinner />
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      );
    }
    return (
      <div className="container card w-75 mt-5 p-4 shadow">
        <h3 className="text-center">Sign up</h3>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, actions) => {this.onSubmit(values, actions)}}
          validationSchema={this.SignUpSchema}
          render={(formProps) => this.renderForm(formProps)}
        />
      </div>
    )
  }
};

const mapStateToProps = ({auth: {loading, error, token, authRedirectPath}}) => {
  return {
    loading,
    error,
    isAuthenticated: token !== null,
    authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
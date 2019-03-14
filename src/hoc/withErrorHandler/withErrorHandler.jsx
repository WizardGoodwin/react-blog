import React, { Component } from 'react';

import ErrorIndicator from '../../shared/ErrorIndicator/ErrorIndicator';
import axios from '../../axios';

const withErrorHandler = (WrappedComponent) => {
  return class extends Component {
    state = {
      hasError: false,
    };

    componentDidMount () {
      axios.interceptors.response.use( res => res, error => {
        if (error.response.status === 401) {
          window.location = '/sign-in';
        } else {
          throw error;
        }
      });
    }

    componentDidCatch() {
      this.setState({ hasError: true });
    }

    render() {
      if (this.state.hasError) {
        return <ErrorIndicator />;
      }
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withErrorHandler;

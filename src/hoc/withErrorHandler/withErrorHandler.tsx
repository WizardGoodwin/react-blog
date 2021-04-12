import React, { Component, FC } from 'react';
import axios from '../../axios';

import ErrorIndicator from '../../shared/ErrorIndicator/ErrorIndicator';

const withErrorHandler = (WrappedComponent: FC) => {
  return class extends Component {
    state = {
      hasError: false,
    };

    // handling 401 error with axios interceptors
    componentDidMount() {
      axios.interceptors.response.use(
        (res) => res,
        (error) => {
          if (error.response.status === 401) {
            window.location.href = '/sign-in';
          } else {
            throw error;
          }
        },
      );
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

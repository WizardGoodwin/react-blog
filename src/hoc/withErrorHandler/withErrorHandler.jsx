import React, { Component } from 'react';
import ErrorIndicator from '../../shared/ErrorIndicator/ErrorIndicator';

const withErrorHandler = ( WrappedComponent ) => {
  return class extends Component {
    state = {
      hasError: false
    };

    componentDidCatch() {
      this.setState({ hasError: true });
    }

    render() {
      if (this.state.hasError) {
        return <ErrorIndicator />;
      }
      return <WrappedComponent {...this.props} />;
    }
  }
};

export default withErrorHandler;
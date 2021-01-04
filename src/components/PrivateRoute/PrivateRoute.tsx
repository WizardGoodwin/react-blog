import React, { FC } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { isUserLoggedIn } from '../../shared/helpers';


interface IProps {
  component: FC;
  path: string;
}

const PrivateRoute: FC<IProps> = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        isUserLoggedIn() ? (
          <Component />
        ) : (
          <Redirect to="/sign-in" />
        )
      }
    />
  );
};

export default PrivateRoute;

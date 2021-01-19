import React, { FC } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectIsUserLoggedIn } from '../../store/selectors/auth';


interface IProps {
  component: FC;
  path: string;
}

const PrivateRoute: FC<IProps> = ({ component: Component, ...rest }) => {
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

  return (
    <Route
      {...rest}
      render={() =>
        isUserLoggedIn ? (
          <Component />
        ) : (
          <Redirect to="/sign-in" />
        )
      }
    />
  );
};

export default PrivateRoute;

import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Users from '../../features/users/Users';
import Posts from '../../features/posts/Posts';
import Comments from '../../features/comments/Comments';
import About from '../About/About';
import NotFound from '../../shared/NotFound/NotFound';
import Layout from '../Layout/Layout';
import SignIn from '../../features/auth/SignIn';
import SignUp from '../../features/auth/SignUp';
import Profile from '../../features/users/Profile';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import PrivateRoute from '../PrivateRoute/PrivateRoute';


const App: FC = () => {
  return (
    <Layout>
      <Switch>
        <Redirect from="/" exact to="/posts" />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <PrivateRoute path="/profile" component={Profile} />
        <Route path="/posts" component={Posts} />
        <PrivateRoute path="/users" component={Users} />
        <Route path="/comments" component={Comments} />
        <Route path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
};

export default withErrorHandler(App);

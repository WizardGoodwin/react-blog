import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Users from '../../pages/Users/Users';
import Posts from '../../pages/Posts/Posts';
import Comments from '../../pages/Comments/Comments';
import About from '../../pages/About/About';
import NotFound from '../../shared/NotFound/NotFound';
import Layout from '../Layout/Layot';
import SignIn from '../../pages/SignIn/SignIn';
import SignUp from '../../pages/SignUp/SignUp';
import Profile from '../../pages/Profile/Profile';
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

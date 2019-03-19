import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import UsersContainer from '../../containers/UsersContainer';
import PostsContainer from '../../containers/PostsContainer';
import CommentsContainer from '../../containers/CommentsContainer';
import About from '../../pages/About/About';
import NotFound from '../../shared/NotFound/NotFound';
import Layout from '../Layout/Layot';
import SignInContainer from '../../containers/SignInContainer';
import SignUpContainer from '../../containers/SignUpContainer';
import ProfileContainer from '../../containers/ProfileContainer';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const App = () => {
  return (
    <Layout>
      <Switch>
        <Redirect from="/" exact to="/posts" />
        <Route path="/sign-in" component={SignInContainer} />
        <Route path="/sign-up" component={SignUpContainer} />
        <Route path="/profile" component={ProfileContainer} />
        <Route path="/posts" component={PostsContainer} />
        <Route path="/users" component={UsersContainer} />
        <Route path="/comments" component={CommentsContainer} />
        <Route path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
};

export default withErrorHandler(App);

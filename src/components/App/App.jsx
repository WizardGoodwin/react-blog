import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import UsersContainer from '../../containers/UsersContainer';
import PostsContainer from '../../containers/PostsContainer';
import CommentsContainer from '../../containers/CommentsContainer';
import NotFound from '../../shared/NotFound/NotFound';
import Layout from '../Layout/Layot';
import SignIn from '../Auth/SignIn/SignIn';
import SignUp from '../Auth/SignUp/SignUp';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class App extends React.Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Redirect from="/" exact to="/posts" />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/posts" component={PostsContainer} />
          <Route path="/users" component={UsersContainer} />
          <Route path="/comments" component={CommentsContainer} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    );
  }
}

export default withErrorHandler(App);

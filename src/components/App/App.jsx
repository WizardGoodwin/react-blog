import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import UsersContainer from '../../containers/UsersContainer';
import PostsContainer from '../../containers/PostsContainer';
import CommentsContainer from '../../containers/CommentsContainer';
import NotFound from '../NotFound/NotFound';
import Layout from '../Layout/Layot';
import SignIn from '../Auth/SignIn/SignIn';
import SignOut from '../Auth/SignOut/SignOut';

export default class App extends React.Component {

  render() {
    return (
      <Layout>
        <Switch>
          <Redirect from='/' exact to='/posts'/>
          <Route path='/sign-in' component={SignIn} />
          <Route path='/sign-up' component={SignOut} />
          <Route path='/posts' component={PostsContainer} />
          <Route path='/users' component={UsersContainer} />
          <Route path='/comments' component={CommentsContainer} />
          <Route component={NotFound}/>
        </Switch>
      </Layout>
    );
  }
}



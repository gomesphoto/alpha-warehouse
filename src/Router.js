import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';

class Router extends Component {
  componentDidMount() {
    window.rogueDispatch = this.context.store.dispatch;
    window.browserHistory = this.context.router.history;
  }
  render = () => (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/login" />} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/inventory" component={Inventory} />
      <Route exact path="/:route" component={Welcome} />
    </Switch>
  );
}

Router.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

export default Router;

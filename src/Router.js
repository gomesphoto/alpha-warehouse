import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { getSessionStatus } from './helpers/utilities';
import FadeIn from './components/FadeIn';
import Column from './components/Column';

const StyledWrapper = styled(FadeIn)`
  height: 100vh;
  width: 100vw;
  text-align: center;
`;

class Router extends Component {
  componentDidMount() {
    window.browserHistory = this.props.browserHistory;
  }
  render = () => (
    <Switch>
      <StyledWrapper>
        <Column>
          <Route
            exact
            path="/:route"
            render={(routerProps) => {
              const path = routerProps.location.pathname;
              console.log(getSessionStatus());
              if (getSessionStatus() === 'LOGIN' && path !== '/logout') return (<Redirect to="/dashboard" />);
              if (getSessionStatus() === 'LOGOUT' && path !== '/logout') return (<Redirect to="/logout" />);
              return (<Login {...routerProps} />);
            }}
          />

          <Route
            exact
            path="/dashboard"
            render={(routerProps) => {
              const path = routerProps.location.pathname;
              console.log(getSessionStatus());
              if (getSessionStatus() === 'LOGOUT' && path !== '/logout') return (<Redirect to="/logout" />);
              return (<Dashboard {...routerProps} />);
            }}
          />
        </Column>
      </StyledWrapper>
    </Switch>
  );
}

Router.propTypes = {
  browserHistory: PropTypes.object.isRequired
};


export default Router;

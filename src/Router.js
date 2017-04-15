import React from 'react';
import styled from 'styled-components';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { getSessionStatus } from './helpers/utilities';
import FadeIn from './components/FadeIn';
import Column from './components/Column';

const StyledWrapper = styled(FadeIn)`
  height: 100vh;
  text-align: center;
`;

const Router = () => (
  <Switch>
    <StyledWrapper>
      <Column>
        <Route
          exact
          path="/:route"
          render={(routerProps) => {
            const path = routerProps.location.pathname;
            if (getSessionStatus() === 'LOGIN' && path !== '/logout') return (<Redirect to="/dashboard" />);
            if (getSessionStatus() === 'LOGOUT' && path !== '/logout') return (<Redirect to="/logout" />);
            return (<Login {...routerProps} />);
          }}
        />

        <Route
          exact
          path="/dashboard/:route"
          render={(routerProps) => {
            if (getSessionStatus() === 'LOGOUT') return (<Redirect to="/logout" />);
            return (<Dashboard {...routerProps} />);
          }}
        />
      </Column>
    </StyledWrapper>
  </Switch>
);

export default Router;

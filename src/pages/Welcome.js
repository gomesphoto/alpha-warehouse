import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import FadeIn from '../components/FadeIn';
import Column from '../components/Column';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import NotFound from '../pages/NotFound';

const StyledWrapper = styled(FadeIn)`
  height: 100vh;
  width: 100vw;
  text-align: center;
`;

const Welcome = () => (
  <StyledWrapper>
    <Column>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact component={NotFound} />
      </Switch>
    </Column>
  </StyledWrapper>
);

export default Welcome;

import React from 'react';
import styled from 'styled-components';
import { Route, Switch, Link } from 'react-router-dom';
import Login from './Login';
import Logout from './Logout';
import NotFound from './NotFound';
import FadeIn from '../components/FadeIn';
import Column from '../components/Column';
import logo from '../assets/alpha-warehouse.svg';

const StyledWrapper = styled(FadeIn)`
  height: 100vh;
  text-align: center;
`;

const StyledContainer = styled(FadeIn)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 250px;
`;

const StyledHeader = styled(Link)`
  padding: 10px;
`;

const StyledAppLogo = styled.img`
  height: 70px;
`;

const Base = () => (
  <StyledWrapper>
    <Column>
      <StyledHeader to="/">
        <StyledAppLogo src={logo} alt="Blean" />
      </StyledHeader>
      <StyledContainer>
        <Switch>
          <Route exact path={'/login'} component={Login} />
          <Route exact path={'/logout'} component={Logout} />
          <Route component={NotFound} />
        </Switch>
      </StyledContainer>
    </Column>
  </StyledWrapper>
);

export default Base;

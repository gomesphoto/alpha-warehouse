import React, { Component } from 'react';
import styled from 'styled-components';
import { Route, Switch, Link } from 'react-router-dom';
import Welcome from './Welcome';
import Login from './Login';
import Logout from './Logout';
import Signup from './Signup';
import NotFound from './NotFound';
import FadeIn from '../components/FadeIn';
import Column from '../components/Column';
import logo from '../assets/logo.svg';

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

class Pages extends Component {
  state = {
    logo: true
  }
  componentWillMount() {
    window.rogueDispatch = this.context.store.dispatch;
  }
  toggleLogo = (bool) => {
    this.setState({ logo: bool });
  }
  render() {
    return (
      <StyledWrapper>
        <Column>
          <StyledHeader to="/">
            {logo && <StyledAppLogo src={logo} alt="Blean" />}
          </StyledHeader>
          <StyledContainer>
            <Switch>
              <Route exact path={'/get-started'} component={Welcome} />
              <Route exact path={'/login'} component={Login} />
              <Route exact path={'/logout'} component={Logout} />
              <Route exact path={'/signup'} component={Signup} />
              <Route
                render={routerProps => (
                  <NotFound hideLogo={this.toggleLogo} {...routerProps} />
                )}
              />
            </Switch>
          </StyledContainer>
        </Column>
      </StyledWrapper>
    );
  }
}

export default Pages;

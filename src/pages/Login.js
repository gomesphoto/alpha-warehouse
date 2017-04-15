import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Link from '../components/Link';
import Input from '../components/Input';
import Button from '../components/Button';
import Page from '../components/Page';
import Form from '../components/Form';
import logo from '../assets/alpha-warehouse.svg';
import { authenticationLogin, authenticationUpdateEmail, authenticationUpdatePassword } from '../redux/_authentication';

const StyledForm = styled(Form)`
  border: 1px solid white;
  margin-top: 60px;
  padding: 25px;
  margin: 60px auto 0;
  box-sizing: border-box;
  border-radius: 10px;
`;

const StyledHeader = styled(Link)`
  padding: 10px;
`;

const StyledAppLogo = styled.img`
  height: 70px;
`;

class Login extends Component {
  onSubmit = () => {
    this.props.authenticationLogin(this.props.email, this.props.password);
  }
  render() {
    return (
      <div>
        <StyledHeader to="/">
          <StyledAppLogo src={logo} alt="Alpha Warehouse" />
        </StyledHeader>
        <Page fetching={this.props.fetching}>
          <h4> {'To get started, login with your details below'} </h4>
          <StyledForm onSubmit={this.onSubmit}>
            <Input label="Email" type="email" onValueChange={value => this.props.authenticationUpdateEmail(value)} />
            <Input label="Password" type="password" onValueChange={value => this.props.authenticationUpdatePassword(value)} />
            <Button type="submit" text="Login" fetching={this.props.fetching} />
          </StyledForm>
        </Page>
      </div>
    );
  }
}

Login.propTypes = {
  authenticationLogin: PropTypes.func.isRequired,
  authenticationUpdateEmail: PropTypes.func.isRequired,
  authenticationUpdatePassword: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};

const reduxProps = ({ authentication }) => ({
  fetching: authentication.fetching,
  email: authentication.email,
  password: authentication.password
});

export default connect(reduxProps, {
  authenticationLogin,
  authenticationUpdateEmail,
  authenticationUpdatePassword
})(Login);

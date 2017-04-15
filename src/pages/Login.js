import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Input from '../components/Input';
import Button from '../components/Button';
import Page from '../components/Page';
import Form from '../components/Form';
import { authenticationLogin, authenticationUpdateEmail, authenticationUpdatePassword } from '../redux/_authentication';

const StyledForm = styled(Form)`
  border: 1px solid white;
  margin-top: 60px;
  padding: 25px;
  margin: 60px auto 0;
  box-sizing: border-box;
  border-radius: 10px;
`;

class Login extends Component {
  onSubmit = () => {
    this.props.authenticationLogin(this.props.email, this.props.password);
  }
  render() {
    return (
      <Page fetching={this.props.fetching}>
        <h4> {'To get started, signup with your details below'} </h4>
        <StyledForm onSubmit={this.onSubmit}>
          <Input label="Email" type="email" onValueChange={value => this.props.loginUpdateEmail(value)} />
          <Input label="Password" type="password" onValueChange={value => this.props.loginUpdatePassword(value)} />
          <Button type="submit" text="Signup" fetching={this.props.fetching} />
        </StyledForm>
      </Page>
    );
  }
}

Login.propTypes = {
  authenticationLogin: PropTypes.func.isRequired,
  loginUpdateEmail: PropTypes.func.isRequired,
  loginUpdatePassword: PropTypes.func.isRequired,
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

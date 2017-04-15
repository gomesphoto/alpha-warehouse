import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Input from '../components/Input';
import Button from '../components/Button';
import Page from '../components/Page';
import Form from '../components/Form';
import { authenticationSignup, authenticationUpdateEmail, authenticationUpdatePassword } from '../redux/_authentication';

const StyledForm = styled(Form)`
  border: 1px solid white;
  margin-top: 60px;
  padding: 25px;
  margin: 60px auto 0;
  box-sizing: border-box;
  border-radius: 10px;
`;

class Signup extends Component {
  onSubmit = () => {
    this.props.authenticationSignup(this.props.email, this.props.password);
  }
  render() {
    return (
      <Page fetching={this.props.fetching}>
        <h4> {'To get started, authentication with your details below'} </h4>
        <StyledForm onSubmit={this.onSubmit}>
          <Input label="Email" type="email" onValueChange={value => this.props.authenticationUpdateEmail(value)} />
          <Input label="Password" type="password" onValueChange={value => this.props.authenticationUpdatePassword(value)} />
          <Button type="submit" text="Signup" fetching={this.props.fetching} />
        </StyledForm>
      </Page>
    );
  }
}

Signup.propTypes = {
  authenticationSignup: PropTypes.func.isRequired,
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
  authenticationSignup,
  authenticationUpdateEmail,
  authenticationUpdatePassword
})(Signup);

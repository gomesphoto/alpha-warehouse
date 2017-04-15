import React, { PropTypes, Component } from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  width: 100%;
`;

class Form extends Component {
  componentWillUnmount() {
    document.activeElement.blur();
  }

  onSubmitForm = (event) => {
    event.preventDefault();
    this.props.onSubmit(event);
  };

  render = () => (
    <StyledForm onSubmit={this.onSubmitForm}>
      {this.props.children}
    </StyledForm>
  )
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default Form;

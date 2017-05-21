import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, transitions } from '../styles';

const StyledSection = styled.div`
  background-color: rgb(${colors.lightGrey});
  padding: 20px;
  border-radius: 5px;
`;

const StyledLabel = styled.p`
  font-weight: 700;
  margin: 0;
  padding: 0;
`;

const StyledSectionContent = styled.div`
  transition: ${transitions.long};
  opacity: ${({ open }) => open ? '1' : '0'};
  pointer-events: ${({ open }) => open ? 'auto' : 'none'};
  visibility: ${({ open }) => open ? 'visible' : 'hidden'};
  height: ${({ open }) => open ? 'auto' : '0'};
`;

class Section extends Component {
  state = {
    open: false
  }
  toggleState = () => this.setState({ open: !this.state.open })
  render = () => {
    const { label, children, ...otherProps } = this.props;
    return (
      <StyledSection {...otherProps}>
        <StyledLabel onClick={this.toggleState}>{label}</StyledLabel>
        <StyledSectionContent open={this.state.open}>
          {children}
        </StyledSectionContent>
      </StyledSection>
    );
  }
}

Section.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Section;

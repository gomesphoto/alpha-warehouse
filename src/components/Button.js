import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { colors, fonts, transitions } from '../styles';

const StyledButton = styled.button`
  transition: ${transitions.base};
  border: none;
  border-style: none;
  box-sizing: border-box;
  border: 1px solid rgb(${colors.blue});
  background-color: ${({ line }) => line ? `rgb(${colors.white})` : `rgb(${colors.blue})`};
  color: ${({ line }) => line ? `rgb(${colors.blue})` : `rgb(${colors.white})`};
  font-size: ${fonts.medium};
  border-radius: 23px;
  font-weight: 500;
  padding: 10px;
  margin: 5px;
  width: 150px;
  height: 36px;
  cursor: pointer;
  will-change: transform;
  &:hover {
    transform: scale(1.02);
  }
`;

const Button = ({ text, line, ...otherProps }) => (
  <StyledButton line={line} {...otherProps}>
    {text}
  </StyledButton>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  line: PropTypes.bool
};

Button.defaultProps = {
  line: false
};

export default Button;

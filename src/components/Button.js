import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, fonts, transitions } from '../styles';

const StyledButton = styled.button`
  transition: ${transitions.base};
  border: none;
  border-style: none;
  box-sizing: border-box;
  border: 1px solid rgb(${colors.dark});
  background-color: ${({ outline, white }) => (outline || white) ? `rgb(${colors.white})` : `rgb(${colors.dark})`};
  color: ${({ outline, white }) => (outline || white) ? `rgb(${colors.dark})` : `rgb(${colors.white})`};
  border-radius: ${({ round }) => round ? '23px' : '0'};
  font-size: ${fonts.medium};
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

const Button = ({ text, outline, white, round, ...otherProps }) => (
  <StyledButton outline={outline} white={white} round={round} {...otherProps}>
    {text}
  </StyledButton>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  outline: PropTypes.bool,
  white: PropTypes.bool,
  round: PropTypes.bool
};

Button.defaultProps = {
  outline: false,
  white: false,
  round: false
};

export default Button;

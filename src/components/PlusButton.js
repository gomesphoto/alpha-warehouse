import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import { colors, transitions } from '../styles';

const StyledPlus = styled(Button)`
  width: 26px;
  height: 26px;
  background-color: rgb(${colors.lightGrey});
  transition: ${transitions.base};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &::after {
    display: block;
    content: '';
    width: 10px;
    height: 2px;
    background-color: rgb(${colors.dark});
    transform: rotate(90deg);
  }

  &::before,
  &::after {
    display: block;
    content: '';
    width: 2px;
    height: 10px;
    background-color: rgb(${colors.dark});
    margin: -1px;
  }
`;

const PlusButton = ({ ...otherProps }) => (
  <StyledPlus {...otherProps} />
);

export default PlusButton;

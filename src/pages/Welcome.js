import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors, fonts } from '../styles';
import Button from '../components/Button';

const StyledApp = styled.div`
  text-align: center;
`;

const StyledIntro = styled.h1`
  font-size: ${fonts.h1};
  color: rgb(${colors.blue});
  font-weight: inherit;
  margin: 30px 0;
`;

const Welcome = () => (
  <StyledApp>
    <StyledIntro>{'Be in charge of your fitness'}</StyledIntro>
    <Link to="/login"><Button text="Login" /></Link>
    <Link to="/signup"><Button line text="Signup" /></Link>
  </StyledApp>
);

export default Welcome;

import styled from 'styled-components';
import { colors, transitions } from '../styles';

const CircleButton = styled.div`
  transition: ${transitions.base};
  margin: 5% auto;
  padding: 5px;
  width: 20px;
  border-radius: 50%;
  height: 20px;
  border: 1px solid rgb(${colors.dark});
  background: transparent;
  cursor: pointer;
  &:hover {
    background: rgb(${colors.darkGrey});
  }
`;

export default CircleButton;

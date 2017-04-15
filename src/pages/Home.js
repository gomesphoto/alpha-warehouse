import React, { Component } from 'react';
import styled from 'styled-components';

const StyledApp = styled.div`
  text-align: center;
  height: 200px;
  padding: 50px;
`;

const user = 'Pedro';

class Home extends Component {
  render() {
    return (
      <StyledApp>
        <h2>{`Congratulations ${user}, you're logged in!`}</h2>
      </StyledApp>
    );
  }
}
export default Home;

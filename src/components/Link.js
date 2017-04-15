import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const LinkWrapper = ({ children, ...otherProps }) => (
  <SLink {...otherProps}>
    {children}
  </SLink>
);

LinkWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default LinkWrapper;

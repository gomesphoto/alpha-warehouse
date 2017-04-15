import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../components/Loader';

const Wrapper = ({ children, fetching }) => (
  <div>{fetching ? <Loader /> : children} </div>
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  fetching: PropTypes.bool
};

Wrapper.defaultProps = {
  fetching: false
};

export default Wrapper;

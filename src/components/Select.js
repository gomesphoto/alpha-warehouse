import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSelect = styled.select`
  -webkit-appearance: none;
  border: none;
  border-radius: 0;
  width: 100%;
  height: 100%;
  font-size: 12px;
  line-height: 1.2;
  padding: 5px 0 5px 15px;
  left: 0;
  text-align: center;
  outline: none;
`;

const renderOptions = options =>
  options.map(option => (
    <option key={option} value={option.toLowerCase()}>
      {option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()}
    </option>
  ));

const Select = ({ options, ...otherProps }) => (
  <StyledSelect {...otherProps}>
    {renderOptions(options)}
  </StyledSelect>
);

Select.propTypes = {
  options: PropTypes.array.isRequired
};

export default Select;

/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import Select from "react-select";

const SelectedInput = styled(Select)`
  font-size: 1.4rem;
  &:focus {
    outline: none;
  }
`;

export default SelectedInput;

/* eslint-disable react/prop-types */

import React from "react";
import styled, { css } from "styled-components";

const FormRowButtonStyled = styled.div<{ $width?: string }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 1.2rem 0;
  width: ${(props) => props.$width || "100%"};
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

interface Props {
  children: React.ReactElement | any;
}

const FormRowButton = ({ children }: Props) => {
  return <FormRowButtonStyled>{children}</FormRowButtonStyled>;
};

export default FormRowButton;

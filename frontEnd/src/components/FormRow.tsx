/* eslint-disable react/prop-types */

import React from "react";
import styled, { css } from "styled-components";

const StyledFormRow = styled.div<{ $width?: string }>`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;
  padding: 1.2rem 0;
  width: ${(props) => props.$width || "100%"};

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;
const Label = styled.label`
  font-weight: 500;
  cursor: pointer;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

interface Props {
  label?: string;
  error?: any;
  children: React.ReactElement | any;
  width?: string;
}

const FormRow = (props: Props) => {
  // console.log("children?.props::",children?.props);
  return (
    <StyledFormRow $width={props.width}>
      <Label htmlFor={props.children?.props?.id}>{props.label}</Label>
      {props.children}
      {!props.error ? (
        <></>
      ) : typeof props.error === "string" ? (
        <Error>{props.error}</Error>
      ) : (
        <Error>{props.error.message}</Error>
      )}
    </StyledFormRow>
  );
};

export default FormRow;

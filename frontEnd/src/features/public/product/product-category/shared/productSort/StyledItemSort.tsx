import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { css, styled } from "styled-components";

const StyledItem = styled.div<{ $isActive: boolean }>`
  display: flex;
  gap: 6px;
  font-size: 1.4rem;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  padding: 5px 1rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 1rem;
  background-color: var(--color-grey-200);
  cursor: pointer;

  ${(props) =>
    props.$isActive &&
    css`
      color: var(--color-primary);
      border-color: var(--color-primary);
      background-color: var(--color-red-100);
    `}
`;

export default function StyledItemSort({ children, active, handlerSetSort }) {
  return (
    <StyledItem $isActive={active} onClick={handlerSetSort}>
      {children}
    </StyledItem>
  );
}

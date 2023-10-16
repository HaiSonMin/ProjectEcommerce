import styled, { css } from "styled-components";

const ItemOptionStyled = styled.div<{ $isActive: boolean }>`
  position: relative;
  padding: 6px 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 1rem;
  cursor: pointer;
  ${(props) =>
    props.$isActive &&
    css`
      border-color: var(--color-primary);
      &::before {
        display: block;
        content: "✓";
        position: absolute;
        left: 0px;
        top: 0px;
        height: 15px;
        width: 17px;
        background-color: var(--color-primary);
        border-radius: 8px 0 10px 0;
        color: var(--color-white);
        font-size: 10px;
        padding-left: 4px;
      }
    `}
`;

export default function ItemOption({ children }) {
  return <ItemOptionStyled $isActive={true}>{children}</ItemOptionStyled>;
}

import styled, { css } from "styled-components";

const Dot = styled.div<{
  $size?: number;
  $isActive: boolean;
  $backgroundColor?: string;
}>`
  content: "";
  height: ${(props) => props.$size}px;
  width: ${(props) => props.$size}px;
  border-radius: 50%;
  background-color: ${(props) => props.$backgroundColor};
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.7s;

  &:hover {
    background-color: var(--color-grey-400);
  }

  ${(props) =>
    props.$isActive &&
    css`
      background-color: var(--color-primary);
      width: 1.6rem;
      border-radius: 1rem;
    `}
`;

Dot.defaultProps = {
  $size: 8, // 8px
  $isActive: false,
  $backgroundColor: "var(--color-grey-100)",
};

export default Dot;

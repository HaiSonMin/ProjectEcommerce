/* eslint-disable no-unused-vars */
import styled, { css } from "styled-components";

const sizes: object = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations: any = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-primary);
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-white);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const ButtonConfirm = styled.div<{ $size?: string; $variation?: string }>`
  text-align: center;
  border-radius: 1rem;
  box-shadow: var(--shadow-md);
  transition: all 0.3s;
  font-weight: 500;
  cursor: pointer;

  ${(props: any) => sizes[props.$size]}
  ${(props: any) => variations[props.$variation]}
`;

ButtonConfirm.defaultProps = {
  $variation: "primary",
  $size: "medium",
};
export default ButtonConfirm;

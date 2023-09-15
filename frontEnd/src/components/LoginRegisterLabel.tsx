import { styled } from "styled-components";

const LoginRegisterLabelStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  width: 100%;
  white-space: nowrap;

  &::before,
  &::after {
    display: block;
    content: "";
    width: 100%;
    height: 1px;
    background-color: var(--color-grey-300);
  }
`;

export default function LoginRegisterLabel({ children }) {
  return <LoginRegisterLabelStyled>{children}</LoginRegisterLabelStyled>;
}

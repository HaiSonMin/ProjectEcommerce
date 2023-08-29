import { styled } from "styled-components";

const FromBoxStyled = styled.div`
  border: 1px solid var(--color-grey-100);
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  padding: 1rem 1.5rem 1rem;
`;

export default function FromBox({ children }) {
  return <FromBoxStyled>{children}</FromBoxStyled>;
}

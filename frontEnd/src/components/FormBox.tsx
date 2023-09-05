import { styled } from "styled-components";

const FormBoxStyled = styled.div`
  border: 1px solid var(--color-grey-100);
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  border: 1px solid var(--color-grey-300);
  padding: 2rem 1.5rem 1rem;
`;

export default function FormBox({ children }) {
  return <FormBoxStyled>{children}</FormBoxStyled>;
}

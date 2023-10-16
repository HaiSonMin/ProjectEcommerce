import { styled } from "styled-components";

const FormHeadingStyled = styled.div`
  text-align: center;
  padding: 1.2rem 0;
  background-color: var(--color-grey-200);
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  border: 1px solid var(--color-grey-300);
  border-bottom: none;
  text-transform: uppercase;
`;

export default function FormHeading({ children }) {
  return <FormHeadingStyled>{children}</FormHeadingStyled>;
}

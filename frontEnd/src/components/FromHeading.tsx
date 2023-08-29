import { styled } from "styled-components";

const FromHeadingStyled = styled.div`
  text-align: center;
  padding: 1.2rem 0;
  background-color: var(--color-grey-200);
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  text-transform: uppercase;
`;

export default function FromHeading({ children }) {
  return <FromHeadingStyled>{children}</FromHeadingStyled>;
}

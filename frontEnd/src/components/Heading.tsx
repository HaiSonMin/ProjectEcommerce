import styled from "styled-components";
import { css } from "styled-components";

const Heading = styled.header<{ $as: string }>`
  color: var(--color-text);
  ${(props) =>
    props.$as === "h1" &&
    css`
      font-size: 3.2rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.$as === "h2" &&
    css`
      font-size: 2.8rem;
      font-weight: 600;
    `}
    
    ${(props) =>
    props.$as === "h3" &&
    css`
      font-size: 2.4rem;
      font-weight: 600;
    `}
    
    ${(props) =>
    props.$as === "h4" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}

      ${(props) =>
    props.$as === "h5" &&
    css`
      font-size: 1.6rem;
      font-weight: 600;
    `}
    
  line-height: 1.4;
`;

export default Heading;

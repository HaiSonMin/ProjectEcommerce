import styled from "styled-components";

const Tag = styled.span<{ $type: string }>`
  font-weight: 600;
  width: fit-content;
  font-size: 1.1rem;
  border-radius: 2rem;
  padding: 0.4rem 1.2rem;
  text-transform: uppercase;

  /* Make these dynamic, based on the received prop */
  color: var(--color-${(props) => props.$type}-700);
  background-color: var(--color-${(props) => props.$type}-100);
`;

export default Tag;

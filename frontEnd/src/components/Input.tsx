import styled from "styled-components";

const Input = styled.input`
  font-size: 1.4rem;
  font-weight: 500;
  background-color: var(--color-grey-0);
  border-radius: 4px;
  border: 1px solid var(--color-grey-300);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #c0bcbc
  }
`;

export default Input;

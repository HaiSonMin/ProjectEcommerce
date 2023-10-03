import styled from "styled-components";

const Input = styled.input`
  font-size: 1.4rem;
  background-color: var(--color-white);
  border-radius: 4px;
  border: 1px solid var(--color-grey-300);
  padding: 0.6rem 1.2rem;
  box-shadow: var(--shadow-sm);
  align-self: flex-start;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #c0bcbc;
  }
`;

export default Input;

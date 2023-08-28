import styled from "styled-components";

const InputFile = styled.input.attrs({ type: "file"})`
  font-size: 1.4rem;
  border-radius: 1rem;

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.8rem 1.2rem;
    margin-right: 1.2rem;
    border-radius: 1rem;
    border: none;
    color: var(--color-brand-50);
    background-color: var(--color-grey-500);
    cursor: pointer;
    transition:
      color 0.2s,
      background-color 0.2s;

    &:hover {
      background-color: var(--color-grey-600);
    }
  }
`;

export default InputFile;

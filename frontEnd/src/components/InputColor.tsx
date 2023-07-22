import { styled } from "styled-components";

const InputColor = styled.input.attrs({ type: "color" })`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 4rem;
  height: 4rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  &::-webkit-color-swatch {
    border-radius: 1rem;
    border: none;
  }
  &::-moz-color-swatch {
    border-radius: 1rem;
    border: none;
  }
`;

export default InputColor;

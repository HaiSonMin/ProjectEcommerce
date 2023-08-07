import styled, { css } from "styled-components";

const Form = styled.form<{ $type?: string }>`
  ${(props) =>
    props.$type !== "modal" &&
    css`
      padding: 2.4rem 4rem;
      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
      min-height: 75vh;
    `}

  ${(props) =>
    props.$type === "modal" &&
    css`
      width: 80rem;
    `}
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-size: 1.4rem;

  & div:last-child {
    margin-top: auto;
  }
`;

Form.defaultProps = {
  $type: "regular",
};

export default Form;

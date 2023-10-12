import styled from "styled-components";
import { css } from "styled-components";

enum Type {
  horizontal = "horizontal",
  vertical = "vertical",
}

const Row = styled.div<{ $type?: Type }>`
  display: flex;
  padding: 0 1rem;
  ${(prop) =>
    prop.$type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
      gap: 1.6rem;
    `};
  ${(prop) =>
    prop.$type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `};
`;

Row.defaultProps = {
  $type: Type.vertical,
};

export default Row;
